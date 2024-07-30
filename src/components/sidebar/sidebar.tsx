"use client"
import React, { ReactNode, useState } from 'react';

interface SidebarProps {
    children: ReactNode;
    title?: string;
    brand?: ReactNode;
}

export default function Sidebar({ children, title }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className={`w-full ${isCollapsed ? 'md:w-16' : 'md:w-1/5'} h-auto md:h-screen flex flex-col border-r border-gray-300 overflow-hidden`}>
            {/* Sidebar header */}
            <div className='w-full p-3 flex justify-between items-center'>
                <div className='flex items-center'>
                    <span 
                        className="material-symbols-outlined mr-2.5 cursor-pointer hidden md:block"
                        onClick={toggleSidebar}
                    >
                        {isCollapsed ? 'menu_open' : 'menu'}
                    </span>
                    <span 
                        className="material-symbols-outlined mr-2.5 cursor-pointer block md:hidden"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? 'close' : 'menu'}
                    </span>
                    {!isCollapsed && title && (
                        <h1 className="text-2xl font-bold text-center font-notojp">
                            {title}
                        </h1>
                    )}
                </div>
            </div>

            <div
                className={`absolute top-16 md:top-0 left-0 w-full border-r border-gray-300 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0 ' : '-translate-x-full'} md:translate-x-0 md:relative md:w-auto overflow-hidden`}
                style={{ zIndex: 1000 }}
            >
                <div className={`transition-all duration-300 bg-black ${isMobileMenuOpen ? 'h-auto' : 'max-h-0 md:max-h-screen'} overflow-hidden`}>
                    {React.Children.map(children, (child) =>
                        // @ts-ignore
                        React.isValidElement(child) ? React.cloneElement(child, { isCollapsed }) : child
                    )}
                </div>
            </div>
        </div>
    )
}
