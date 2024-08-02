import { conn } from "./db"
import { QueryResult, FieldPacket, OkPacketParams } from 'mysql2/promise';
import Rol from "./interfaces/rol"
import Pais from "./pais"
import { hashPassword } from "@/utils/functions"

interface UserData {
    nombres: string;
    username: string;
    email: string;
    rawPassword: string;
    pais: Pais | null;
}

export default class Usuario {
    public id: string = '';
    private _uuid: string;
    private _username: string;
    private _email: string;
    private _password: string;
    private _bio: string = "";
    private _pais: Pais | null;
    private _provider_id: string | null;
    private _foto_perfil: string = "";

    constructor(uuid: string | null, username: string, email: string, password: string | null, pais: Pais | null, nombres?: string, bio?: string) {
        this._uuid = uuid || "";
        this._username = username;
        this._email = email;
        this._password = password || "";
        this._pais = pais
        this._provider_id = ""
        if (nombres) this._username = nombres
        if (bio) this._bio = bio
    }

    get uuid(): string {
        return this._uuid;
    }

    get username(): string {
        return this._username;
    }
    set username(username: string) {
        this._username = username;
    }

    get nombres(): string {
        return this._username;
    }
    set nombres(nombres: string) {
        this._username = nombres;
    }

    get email(): string {
        return this._email;
    }

    set email(email: string) {
        this._email = email;
    }

    get password(): string {
        return this._password;
    }

    get bio(): string {
        return this._bio;
    }
    set bio(bio: string) {
        this._bio = bio;
    }

    get pais(): Pais | null {
        return this._pais;
    }
    set pais(pais: Pais) {
        this._pais = pais;
    }

    get providerId(): string | null {
        return this._provider_id;
    }
    set providerId(provider_id: string | null) {
        this._provider_id = provider_id;
    }

    get profilePhoto(): string {
        return this._foto_perfil;
    }
    set profilePhoto(foto_perfil: string) {
        this._foto_perfil = foto_perfil;
    }

    static async getByID(id: string) {
        const user: Array<any> = await conn.query("SELECT * FROM `usuario` WHERE uuid = ?", [id]);
        if (user.length == 0) {
            return null
        }
        const pais: Pais | null = await Pais.getById(user[0].pais_id)
        return new Usuario(user[0].uuid, user[0].username, user[0].email, null, pais, undefined, user[0].bio)
    }

    static async getByEmail(email: string): Promise<Usuario | null> {
        const [user]: Array<any> = await conn.query("SELECT * FROM `usuario` WHERE email = ?", [email]);
        if (user.length == 0) {
            return null
        }
        //@ts-ignore
        const pais: Pais | null = user[0].pais ? await Pais.getById(user[0].pais) : null
        return new Usuario(user[0].uuid, user[0].username, user[0].email, null, pais, undefined, user[0].bio)
    }

    static async create(userData: UserData): Promise<Usuario | null> {
        const hashedPassword = await hashPassword(userData.rawPassword)
        return await (new Usuario(null, userData.username, userData.email, hashedPassword, userData.pais, userData.nombres, '')).save()
    }
    public async existUser(): Promise<boolean> {
        const existUser: Array<any> = await conn.query("SELECT * FROM `usuario` WHERE email = ? OR username = ?", [this.email, this.username]);
        return existUser.length > 0
    }

    static async checkUser(email: string, rawPassword: string): Promise<Usuario> {
        const hashedPassword = await hashPassword(rawPassword)
        const user: any = await conn.query("SELECT * FROM `usuario`  WHERE email = ? AND  password = ?", [email, hashedPassword]);
        return user
    }

    static async updateUserProfile(id: string, data: { bio: string, username: string }): Promise<any | null> {
        const [user] = await conn.query("UPDATE `usuario` SET `username` = ?, `bio` = ? WHERE `uuid` = ?", [data.username, data.bio, id]);
        return user
    }

    public async save(): Promise<Usuario | null> {
        const [rows] = await conn.query("SELECT id FROM `rol` WHERE nombre = ?", ["usuario"]);
        const rol: Rol[] = rows as Rol[];

        const [result] = await conn.query("INSERT INTO `usuario` (`uuid`, `username`, `email`, `password`, `rol_id`, `pais_id`, `provider_id`) VALUES (UUID(), ?, ?, ?, ?, ?, ?)", [this.username, this.email, this.password, rol[0].id, this.pais?.id || null, this.providerId]);
        const insertResult = result as OkPacketParams;

        // Obtener el ID del nuevo usuario
        const userId = insertResult.insertId;

        // Obtener los detalles del usuario
        const [userRows] = await conn.query("SELECT * FROM `usuario` WHERE id = ?", [userId]);
        const savedUser: Usuario[] = userRows as Usuario[];

        return savedUser[0] || null;
    }
}   