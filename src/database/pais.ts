import { conn } from "./db"

export default class Pais {
    id:string = ""
    private _nombre: string;
    private _abreviacion: string;
    private _cod_telf: string;
    private _long_num_telf: Number;

    constructor(nombre: string, abreviacion: string, cod_telf: string, long_num_telf:Number) {
        this._nombre = nombre;
        this._abreviacion = abreviacion;
        this._cod_telf = cod_telf;
        this._long_num_telf = long_num_telf;
    }

    get nombre(): string {
        return this._nombre;
    }

    set nombre(value: string) {
        this._nombre = value;
    }

    get abreviacion(): string {
        return this._abreviacion;
    }
    set abreviacion(value: string) {
        this._abreviacion = value;
    }

    get cod_telf(): string {
        return this._cod_telf;
    }

    get long_num_telf(): Number {
        return this._long_num_telf;
    }

    static async getById(id:string): Promise<Pais> {
        const res:Pais = await conn.query("SELECT * FROM pais WHERE id = ?", [id])
        await conn.end()
        return res
    }

    static async getByName(nombre:string): Promise<Pais> {
        const res:Pais = await conn.query("SELECT * FROM pais WHERE nombre = ?", [nombre])
        await conn.end()
        return res
    }
}