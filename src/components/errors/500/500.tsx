import warning from "@/public/500/warning.svg"
import Image from "next/image"

export default function Error500(){
    return(
        <div className="flex flex-col items-center justify-center h-full max-h-screen w-full">
            <Image src={warning} alt="5xx" className="w-1/2" />
            <h1 className="text-4xl font-bold">Ups! Hubo un error en nuestros servidores</h1>
        </div>
    )
}