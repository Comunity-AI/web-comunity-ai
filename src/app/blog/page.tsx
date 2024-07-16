'use client';

import Navbar from "@/components/nav/navbar";
import Image from "next/image";
import bannerImage from "@/public/imgs/banner.jpg";
import principal from "@/public/imgs/principal.jpg";
import { useEffect } from "react";

export default function Blog() {
    useEffect(() => {
        const newsImgs: NodeListOf<Element> = document.querySelectorAll('.card')
        newsImgs.forEach((div) => {
            const img = div.querySelector('img')
            div.addEventListener('mouseenter', () => img?.classList.add('scale-105'))
            div.addEventListener('mouseleave', () => img?.classList.remove('scale-105'))
        })
    })
    return (
        <>
            <Navbar />
            <section className="m-auto w-4/5 h-full dark:text-blanco">
                <div className="w-full grid grid-cols-6 mt-10 gap-3">
                    <div className="col-span-full text-center mb-5">
                        <h2 className="text-4xl font-notojp">Blog</h2>
                    </div>
                    <div className="col-span-4 relative h-[24rem]">
                        <div className="absolute top-o left-0 pl-3">
                            <p className="cursor-default select-none">Research - May 13, 2024</p>
                        </div>
                        <div className="w-full h-full">
                            <Image
                                className="w-full max-h-full object-cover rounded-lg"
                                src={bannerImage}
                                alt="Banner"
                            />
                        </div>
                    </div>
                    <div className="col-span-2 h-[24rem] relative">
                        <div className="grid grid-rows-2 gap-3 max-h-full">
                            <div className="card">
                                <div className="absolute top-o left-0 pl-3 z-10">
                                    <p className="cursor-default select-none">Research - May 13, 2024</p>
                                </div>
                                <div className="w-full h-full overflow-hidden rounded-lg">
                                    <Image
                                        className="w-full h-full object-cover transition-all ease-in-out duration-500"
                                        src={principal}
                                        alt="Banner"
                                    />
                                </div>
                            </div>
                            <div className="card">
                                <div className="absolute top-o left-0 pl-3 z-10">
                                    <span className="cursor-default select-none">Research - May 13, 2024</span>
                                </div>
                                <div className="w-full h-full overflow-hidden rounded-lg">
                                    <Image
                                        className="w-full h-full object-cover transition-all ease-in-out duration-500"
                                        src={bannerImage}
                                        alt="Banner"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-7">
                    <div>
                        <div className="w-16 border-b-2 border-b-morado">
                            <p className="text-xl font-notojp text-verde">News</p>
                        </div>
                    </div>
                    <div className="my-7 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="card w-auto h-72 relative rounded-xl overflow-hidden shadow-md">
                            <div className="absolute w-full h-full">
                                <Image
                                    className="w-full h-full transition-all ease-in-out duration-500 hover:scale-110"
                                    src={bannerImage}
                                    alt="Banner"
                                />
                            </div>
                            <div className="flex py-5 relative h-full">
                                <button className="bg-morado text-purple-300 rounded-xl px-3 py-1 absolute right-2 text-sm hover:scale-105 hover:text-blanco">
                                    AI
                                </button>
                                <div className="absolute px-5 bottom-2 py-2 font-notojp font-semibold text-md">
                                    100 things we announced at I/O 2024
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}