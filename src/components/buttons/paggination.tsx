import { ReactNode } from "react";

interface PaginacionProps {
    labelPrev: string | ReactNode;
    labelNext: string | ReactNode;
    currentPage: number;
    prevPage: () => void;
    nextPage: () => void;
}

export default function Paginacion({labelPrev, labelNext, currentPage, prevPage, nextPage}: PaginacionProps) {
    return (
        <div>
            <button className="p-2 mx-3 rounded-md text-white bg-verde hover:bg-verde/90 disabled:bg-verde/40" onClick={prevPage} disabled={currentPage === 0}>{labelPrev}</button>
            <button className="p-2 mx-3 rounded-md text-white bg-verde hover:bg-verde/90 disabled:bg-verde/40" onClick={nextPage}>{labelNext}</button>
        </div>
    );
}