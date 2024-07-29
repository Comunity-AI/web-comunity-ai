"use client";

import { useApi } from "@/helpers/cache";
import { useState } from "react";
import { ResponseList } from "../../interfaces/interfaces";

export const useListModels = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const api = `modelos?pag=${currentPage}`;
    const { data: modelos, error, status, notFound } = useApi<ResponseList>(api);
    
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
    };

    return { modelos, error, status, notFound, currentPage, nextPage, prevPage };
}