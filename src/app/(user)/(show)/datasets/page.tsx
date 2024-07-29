"use client";

import Loader from "@/components/utils/loader";
import { useListDatasets } from "./useListDatasets";
import Card from "@/components/cards/showCard";
import { useRouter } from "next/navigation";
import Paginacion from "@/components/buttons/paggination";

export default function ListDatasets() {
    const { datasets, error, status, currentPage, nextPage, prevPage } = useListDatasets();
    const router = useRouter();

    if (status === 'fetching') {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const prevIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>

    const nextIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>

    return (
        <div className="w-full h-full grid grid-rows-12 m-auto">
            <section className="pt-8 row-span-11 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {
                    datasets && datasets.count > 0 ? (
                        <>
                            {datasets.results.map((dataset) => (
                                <Card onClick={() => router.push(`datasets/${dataset.uuid}`)} backgroundImg={`${process.env.NEXT_PUBLIC_API_URL}/image/${dataset.bannerURL}`} key={dataset.uuid} title={dataset.titulo} description={dataset.descripcion} autor={dataset.autor.username} />
                            ))}
                        </>
                    ) : (
                        <p>No Datasets found</p>
                    )
                }
            </section>
            <section className="w-full flex justify-center">
                <Paginacion currentPage={currentPage} labelNext={nextIcon} nextPage={nextPage} labelPrev={prevIcon} prevPage={prevPage} />
            </section>
        </div>
    );
}