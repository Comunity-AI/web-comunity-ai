import React, { MouseEvent } from "react";

interface itemProps {
    name: string;
    icon: string | React.ReactNode;
    active?: boolean;
    onClick: (e:MouseEvent<HTMLDivElement>, name:string) => void;
    props?: any;
}

const ItemSB: React.FC<itemProps> = ({ name, icon, active, onClick, ...props }) => {
    return (
        <div className={"relative w-full flex p-3 items-center text-gray-300 cursor-pointer transition-colors duration-500 " + (active ? "bg-gray-800 text-verde-claro" : "hover:scale-105 hover:text-morado hover:bg-gray-800")} onClick={(e) => onClick(e, name)} {...props}>
            <div className="w-1/5">
                {typeof icon === 'string' ? (
                    <img src={icon} alt="icon" className="size-6" />
                ) : (
                    <div className="size-6">{icon}</div>
                )}
            </div>
            <div className="w-4/5 text-m font-notojp">
                {name}
            </div>
        </div>
    )
}

export default ItemSB