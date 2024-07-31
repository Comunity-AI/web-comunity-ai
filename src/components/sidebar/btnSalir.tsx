"use client";

import { MouseEvent } from "react";

interface BtnSalirProps {
    isCollapsed: boolean;
    handleClick: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function BtnSalir({ handleClick, isCollapsed }: BtnSalirProps) {
    return (
        <div className='relative w-full p-3 flex items-center text-gray-50 bg-rose-500 cursor-pointer' onClick={handleClick}>
            <div className='flex w-1/5 items-center'>
                <span className="material-symbols-outlined">logout</span>
            </div>
            {
                !isCollapsed &&
                <div className='w-4/5 text-md font-notojp'>Cerrar sesion</div>
            }
        </div>
    )
}