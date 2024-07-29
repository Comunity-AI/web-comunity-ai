import Image from 'next/image';
import React from 'react';

// Define la interfaz para las props
interface CardProps {
    backgroundImg?: string;
    title: string;
    description: string;
    autor: string;
    classname?: string;
    onClick: () => void;
}

// Componente funcional que acepta props
const Card = ({
    backgroundImg,
    title,
    description,
    autor,
    classname,
    onClick
}: CardProps) => {
    return (
        <div onClick={onClick} className={`relative cursor-pointer rounded-lg border text-card-foreground shadow-sm w-full max-w-64 h-52 p-6 grid gap-6 overflow-hidden group ${classname}`} data-v0-t="card">
            {
                backgroundImg &&
                <img
                    src={backgroundImg}
                    alt={`communityAI-image-${title}`}
                    className='absolute inset-0 w-full h-full object-cover group-hover:opacity-50'
                />
            }
            <div className="relative z-10 space-y-2">
                <h2 className="text-2xl font-bold mix-blend-overlay">{title}</h2>
                <p className="text-muted-foreground mix-blend-overlay">{description}</p>
            </div>
            <div className="absolute bottom-3 right-6">
                <p>@{autor}</p>
                {/* <div className="grid gap-1">
                    <h3 className="text-lg font-semibold">Model Architecture</h3>
                    <p className="text-muted-foreground">{architecture}</p>
                </div> */}
                {/* <div className="grid gap-1">
                    <h3 className="text-lg font-semibold">Performance Metrics</h3>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 fill-primary"
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                            </svg>
                            <span className="font-medium">{autor}</span>
                        </div>
                        <span className="text-muted-foreground">Autor</span>
                    </div>
                </div> */}
                <div className="grid gap-1">
                    {/* {
                        useCases && useCases.length > 0 && <>
                            <h3 className="text-lg font-semibold">Intended Use Cases</h3>
                            <ul className="list-disc pl-5 text-muted-foreground">
                                {useCases.map((useCase, index) => (
                                    <li key={index}>{useCase}</li>
                                ))}
                            </ul>
                        </>
                    } */}
                </div>
            </div>
        </div>
    );
};

export default Card;
