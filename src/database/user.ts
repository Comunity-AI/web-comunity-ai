import { conn } from "./db"
import Rol from "./interfaces/rol"
import Pais from "./pais"

export default class Usuario {
    private _username: string;
    private _email: string;
    private _password: string;
    private _pais: Pais|null;
    private _provider_id: string;
    private _foto_perfil: string = "";

    constructor(username: string, email: string, password: string|null, pais:Pais|null) {
        this._username = username;
        this._email = email;
        this._password = password || "";
        this._pais = pais
        this._provider_id = ""
    }

    get username(): string {
        return this._username;
    }

    set username(username: string) {
        this._username = username;
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

    get pais(): Pais|null {
        return this._pais;
    }
    set pais(pais: Pais) {
        this._pais = pais;
    }

    get providerId(): string {
        return this._provider_id;
    }
    set providerId(provider_id: string) {
        this._provider_id = provider_id;
    }

    get profilePhoto(): string {
        return this._foto_perfil;
    }
    set profilePhoto(foto_perfil: string) {
        this._foto_perfil = foto_perfil;
    }

    static async getByEmail(email: string): Promise<Usuario|null> {
        const user:Array<any> = await conn.query("SELECT * FROM `usuario` WHERE email = ?", [email]);
        await conn.end()
        if (user.length == 0) {
            return null
        }
        const pais:Pais|null = await Pais.getById(user[0].pais)
        return new Usuario(user[0].username, user[0].email, null, pais)
    }

    public async existUser(): Promise<boolean> {
        const existUser:Array<any> = await conn.query("SELECT * FROM `usuario` WHERE email = ? OR username = ?", [this.email, this.username]);
        await conn.end()
        return existUser.length > 0
    }

    public async save(): Promise<boolean> {
        const rol:Rol[] = await conn.query("SELECT id FROM `rol` WHERE nombre = ?", ["usuario"])

        const saveUser:any = await conn.query("INSERT INTO `usuario` (`uuid`, `username`, `email`, `password`, `rol_id`, `pais_id`, `provider_id`) VALUES (UUID(), ?, ?, ?, ?, ?, ?)", [this.username, this.email, this.password, rol[0].id, this.pais?.id || null, this.providerId]);
        await conn.end()
        return saveUser.affectedRows === 1
    }
}