import { NextRequest, NextResponse } from "next/server";
import Usuario from "@/database/user"
import Pais from "@/database/pais";

export async function POST(req:NextRequest){
    const {email, username, pais, password} = await req.json();
    if(!email || !username || !pais) return NextResponse.json({message: "Faltan datos", status:false})

    const usuario = new Usuario(username, email, password, null);

    const existUser:boolean = await (usuario.existUser())
    if(existUser){
        return NextResponse.json({message: "El usuario o email ya existe", status:false})
    }

    usuario.pais = await Pais.getByName(pais);
    usuario.save();
    return NextResponse.json({status:true})
}