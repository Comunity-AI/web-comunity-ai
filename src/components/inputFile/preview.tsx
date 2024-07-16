"use client";

import { useEffect, useState, useCallback } from "react";

interface PreviewImgProps {
    image: File;
    alt: string;
    onRemove: () => void;
}

export default function PreviewImage({ image, alt, onRemove }: PreviewImgProps) {
    const [visible, setVisible] = useState(true);
    const [imageURL, setImageURL] = useState<string | null>(null);

    const createImageURL = useCallback((image: File) => {
        const url = URL.createObjectURL(image);
        setImageURL(url);

        return () => {
            URL.revokeObjectURL(url);
            setImageURL(null);
        };
    }, []);

    useEffect(() => {
        const revokeURL = createImageURL(image);
        return () => {
            revokeURL();
        };
    }, [image, createImageURL]);

    const handleClick = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
        setVisible(prevVisible => !prevVisible);
        onRemove();
    }, [onRemove]);

    return (
        <div className={`relative w-full h-full ${visible ? 'flex' : 'hidden'}`}>
            {visible && imageURL && (
                <>
                    <div className="absolute top-3 right-3">
                        <span className="material-symbols-outlined cursor-pointer" onClick={handleClick}>block</span>
                    </div>
                    <img className="w-full h-full object-contain" src={imageURL} alt={alt} />
                </>
            )}
        </div>
    );
}
