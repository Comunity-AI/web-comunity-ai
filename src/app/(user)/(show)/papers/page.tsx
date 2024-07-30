"use client";

import Loader from "@/components/utils/loader";
import { useListPapers } from "./useListPapers";
import Card from "@/components/cards/showCard";
import Paginacion from "@/components/buttons/paggination";
import { useRouter } from "next/navigation";

export default function ListPapers() {
    const { papers, error, status, currentPage, nextPage, prevPage } = useListPapers();
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
            <section className="w-full pt-8 row-span-11 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center">
                {
                    papers && papers.count > 0 ? (
                        <>
                            {papers.results.map((paper) => (
                                <Card onClick={()=>router.push(`papers/${paper.uuid}`) } backgroundImg={`${process.env.NEXT_PUBLIC_API_URL}/image/${paper.bannerURL}`} key={paper.uuid} title={paper.titulo} description={paper.descripcion} autor={paper.autor.username} />
                            ))}
                        </>
                    ) : (
                        <p>No papers found</p>
                    )
                }
            </section>
            <section className="w-full flex justify-center">
                <Paginacion currentPage={currentPage} labelNext={nextIcon} nextPage={nextPage} labelPrev={prevIcon} prevPage={prevPage} />
            </section>
        </div>
    );
}