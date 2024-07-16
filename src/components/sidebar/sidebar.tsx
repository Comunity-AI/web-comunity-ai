"use client"
import React, { ReactNode } from 'react';

interface SidebarProps {
    children: ReactNode;
    title?: string;
    brand?: ReactNode;
}

export default function Sidebar({ children, title }: SidebarProps) {
    return (
        <div className="w-1/5 h-screen flex-col overflow-y-scroll overflow-x-hidden border-r border-gray-300">
            <div className='w-full p-3 flex justify-between'>
                <div className='flex items-center'>
                    <span className="material-symbols-outlined mr-2.5 cursor-pointer">menu</span>
                    {title ? <h1 className="text-2xl font-bold text-center font-notojp">{title}</h1> : <></>}
                </div>
            </div>

            {children}
        </div>
    )
}