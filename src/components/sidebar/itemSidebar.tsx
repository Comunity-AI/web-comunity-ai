import React, { MouseEvent } from "react";

interface itemProps {
    name: string;
    icon: string | React.ReactNode;
    active?: boolean;
    onClick: (e:MouseEvent<HTMLDivElement>, name:string) => void;
    isCollapsed?: boolean;
    props?: any;
}

const ItemSB: React.FC<itemProps> = ({ name, icon, active, onClick, isCollapsed, ...props }) => {
    return (
        <div 
            className={"relative w-full flex p-3 items-center text-gray-300 cursor-pointer transition-colors duration-500 " + (active ? "bg-gray-800 text-verde-claro" : "hover:scale-105 hover:text-morado hover:bg-gray-800")} 
            onClick={(e) => onClick(e, name)} 
            {...props}
        >
            <div className="flex w-1/5 items-center">
                {typeof icon === 'string' ? (
                    <img src={icon} alt="icon" className="size-6" />
                ) : (
                    <div className="size-6">{icon}</div>
                )}
            </div>
            {
                !isCollapsed && 
                <div className="w-4/5 text-md font-notojp">{name}</div>
            }
        </div>
    )
}

export default ItemSB