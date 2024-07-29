"use client";

import React, { MouseEvent } from "react";
import ItemSB from "../sidebar/itemSidebar";

export interface DataProps {
    name: string;
    icon: string | React.ReactNode;
}

interface MenuProps {
    visible: boolean;
    data: DataProps[];
    isCollapsed: boolean;
    handleClick: (e: MouseEvent<HTMLDivElement>, name: string) => void
}

export default function MenuCrear({ visible, data, isCollapsed, handleClick }: MenuProps) {

    return (
        <div className={`item absolute w-36 top-0 bg-slate-800 rounded-md z-20 translate-y-14 ${!visible ? "hidden" : "block"}`}>
            {
                data.map((item, index) => (
                    <ItemSB name={item.name} icon={item.icon} key={index} active={false} onClick={handleClick} isCollapsed={isCollapsed}/>
                ))
            }
        </div>
    )
}