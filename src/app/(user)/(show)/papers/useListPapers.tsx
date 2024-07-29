import { useState } from "react";
import { ResponseList } from "../../interfaces/interfaces";
import { useApi } from "@/helpers/cache";

export const useListPapers = () =>{
    const [currentPage, setCurrentPage] = useState<number>(0);
    const api = `papers?pag=${currentPage}`;
    const { data: papers, error, status } = useApi<ResponseList>(api);

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
    };

    return { papers, error, status, currentPage, nextPage, prevPage };
}