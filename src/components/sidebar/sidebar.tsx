"use client"
import React, { ReactNode, useState } from 'react';

interface SidebarProps {
    children: ReactNode;
    title?: string;
    brand?: ReactNode;
}

export default function Sidebar({ children, title }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`w-1/5 h-screen flex-col overflow-y-scroll overflow-x-hidden border-r border-gray-300 ${isCollapsed ? 'w-20' : 'w-1/5'}`}>
            <div className='w-full p-3 flex justify-between'>
                <div className='flex items-center'>
                    <span className="material-symbols-outlined mr-2.5 cursor-pointer" onClick={toggleSidebar}>menu</span>
                    {!isCollapsed && title ? <h1 className="text-2xl font-bold text-center font-notojp">{title}</h1> : <></>}
                </div>
            </div>

            {React.Children.map(children, (child) =>
                //@ts-ignore
                React.isValidElement(child) && React.cloneElement(child, { isCollapsed })
            )}
        </div>
    )
}