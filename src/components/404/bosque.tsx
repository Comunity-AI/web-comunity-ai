import bosqueSVG from "@/public/404/bosque.svg"
import Image from "next/image"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-full max-h-screen w-full">
            <Image src={bosqueSVG} alt="404" className="w-1/2" />
            <h1 className="text-4xl font-bold">404 - Not Found</h1>
        </div>
    )
}