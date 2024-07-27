"use client";

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const useCrearDataset = () => {
    const { data: session } = useSession();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [readme, setValue] = useState("# Acerca del Dataset");
    const [files, setFiles] = useState<File[]>([]);
    const [imgHeader, setHeaderImage] = useState(null);
    const router = useRouter();

    const handleChangeFiles = (files: File[]) => setFiles(files);

    const handleSubmit = (e:any) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !readme.trim() || files.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, completa todos los campos obligatorios',
            });
        }

        const data = new FormData();
        data.append('title', title.trim());
        data.append('description', description.trim());
        data.append('readme', readme.trim());

        files.forEach((file) => data.append('files', file, file.name));
        
        if (readme.trim()) {
            const blobReadme = new Blob([readme.trim()], { type: 'text/markdown' });
            data.append('readme', blobReadme, 'README.md');
        }
        
        if (imgHeader) {
            data.append('banner', imgHeader);
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/crear/dataset`, {
            method: 'POST',
            headers: {
                'Authorization': `${session?.accessToken}`
            },
            body: data
        })
            .then(res => res.json())
            .then(data => {
                if (data.err && data.err.name === "TokenExpiredError") {
                    // renovar token
                }

                if (data.err || data.error) {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.details || data.message,
                    });
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Dataset creado',
                    text: 'El dataset se ha creado correctamente',
                });

                router.push(`/datasets/${data.id}`);
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                });
            });
    }

    const handleCancel = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se perderán los cambios no guardados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, salir'
        }).then((result) => {
            if (result.isConfirmed) {
                router.back();
            }
        });
    }

    return {
        title,
        setTitle,
        description,
        setDescription,
        readme,
        setValue,
        files,
        setFiles,
        imgHeader,
        setHeaderImage,
        handleChangeFiles,
        handleSubmit,
        handleCancel
    };
}
