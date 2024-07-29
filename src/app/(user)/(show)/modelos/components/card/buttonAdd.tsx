import { ReactNode } from "react";

interface ButtonAddProps {
    label?: string;
    children?: ReactNode;
    className?: string;
    onClick: () => void;
}

export default function ButtonAdd({label, children, onClick, className}: ButtonAddProps) {
    return (
        <button className={`p-2 text-sm rounded-lg border border-white ${className}`} onClick={onClick}>
            {label}
            {children}
        </button>
    )
}