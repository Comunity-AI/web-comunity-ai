"use client";

import { useState } from "react"
import { ResponseList } from "../../interfaces/interfaces"
import { useApi } from "@/helpers/cache";

export const useListDatasets = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const api = `datasets?pag=${currentPage}`;
    const { data: datasets, error, status } = useApi<ResponseList>(api);

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
    };

    return { datasets, error, status, currentPage, nextPage, prevPage };
};