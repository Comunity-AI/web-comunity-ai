"use client";

import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";

import MenuCrear, { DataProps } from "../menu/MenuCrear";
import { svgs_items } from "@/helpers/svgs";

const lista: DataProps[] = [
    {
        name: "Dataset",
        icon: svgs_items.datasets,
    },
    {
        name: "Modelo",
        icon: svgs_items.cerebrito,
    },
    {
        name: "Paper",
        icon: svgs_items.paper,
    }
]

interface BtnCrearProps {
    isCollapsed: boolean;
}

export default function BtnCrear({ isCollapsed }: BtnCrearProps) {

    const [visible, setVisible] = useState(false);
    const router = useRouter();

    function handleMenu(e: MouseEvent<HTMLDivElement>) {
        e.preventDefault()
        setVisible(!visible);

    }

    function handleClick(e: MouseEvent<HTMLDivElement>, name: string) {
        e.preventDefault()
        const option = name.toLowerCase()
        router.push(`/crear/${option}`);
    }

    return (
        <div className='relative w-full p-3 flex items-center text-gray-50 bg-verde cursor-pointer' onClick={handleMenu}>
            <div className='w-1/5 mr-2'>
                <span className="material-symbols-outlined">add</span>
            </div>
            {
                !isCollapsed && 
                <div className='w-4/5'>
                    Crear
                </div>
            }
            <MenuCrear data={lista} handleClick={handleClick} visible={visible} isCollapsed={isCollapsed}/>
        </div>
    )
}