// components/Carousel.js
"use client";

import Image from "next/image";
import bannerImage from '@/public/imgs/banner.jpg'
import { useEffect } from 'react';

const Carousel = () => {
    let lastScrollTop = 0;
    let idxSlide = 0;
    let slideAnterior: HTMLElement | null = null
    let btnAnterior: HTMLElement | null = null;
    let btnSliders: NodeListOf<HTMLElement>;

    const changeSlide = (slides: NodeListOf<HTMLElement>, i: number) => {
        slides[i].classList.remove("opacity-0");
        slides[i].classList.add("opacity-100");
        if (slideAnterior) {
            slideAnterior.classList.add("opacity-0");
            slideAnterior.classList.remove("opacity-100");
            btnAnterior?.classList.add("bg-morado");
        }

        slideAnterior = slides[i], btnAnterior = btnSliders[i];
        btnSliders[i].classList.remove("bg-morado");
        btnSliders[i].classList.add("bg-blanco");
        return (i + 1) % slides.length;
    }

    const showSlider = (i: number) => {
        console.log(i);
        idxSlide = changeSlide(document.querySelectorAll(".slide"), i - 1);
    }

    useEffect(() => {
        const navbar: HTMLElement | null = document.getElementById('navbar');

        const handleScroll = () => {
            let scrollTop: number = window.pageYOffset || document.documentElement.scrollTop;
            if (!navbar) return

            if (scrollTop > lastScrollTop) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        }

        window.addEventListener('scroll', handleScroll);

        const slides: NodeListOf<HTMLElement> = document.querySelectorAll(".slide");
        btnSliders = document.querySelectorAll(".btnSlider");

        const sliderInterval = setInterval(() => {
            idxSlide = changeSlide(slides, idxSlide);
        }, 4500);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(sliderInterval);
        };
    }, []);

    return (
        <div className="w-full h-full">
            <div className="relative w-full sliderAx h-[90%] mb-2">
                <div className="slide absolute inset-0 transition-opacity ease-in duration-1000 fade-in-out rounded-lg overflow-hidden">
                    <div className="bg-cover bg-center h-full text-white py-24 px-10 object-cover">
                        <div className="absolute inset-0 -z-10">
                            <Image
                                src={bannerImage}
                                alt="Banner"
                                fill
                                style={{objectFit:"cover", objectPosition:"center"}}
                            />
                        </div>
                        <div className="h-full w-full flex justify-start">
                            <div className="my-auto">
                                <p className="text-3xl font-bold">Bienvenido a Comunity AI</p>
                                <p className="text-2xl mb-10 leading-none">Se parte de la gran comunidad</p>
                                <a href="#"
                                    className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">Explorar</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="slide absolute inset-0 transition-opacity duration-1000 opacity-0">
                    <div className="bg-cover bg-top h-full text-white py-24 px-10 object-cover" style={{ backgroundImage: "https://images.unsplash.com/photo-1544144433-d50aff500b91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" }}>
                        <p className="font-bold text-sm uppercase">Services</p>
                        <p className="text-3xl font-bold">Hello world</p>
                        <p className="text-2xl mb-10 leading-none">Carousel with TailwindCSS and jQuery</p>
                        <a href="#"
                            className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">Contact
                            us</a>
                    </div>
                </div>
            </div>
            <div className="flex justify-between w-12 mx-auto py-2 z-20">
                <button onClick={() => showSlider(1)} className="btnSlider border-2 border-morado bg-blanco rounded-full w-4 p-2 "></button>
                <button onClick={() => showSlider(2)} className="btnSlider border-2 border-morado bg-morado rounded-full w-4 p-2"></button>
            </div>
        </div>
    );
};

export default Carousel;
