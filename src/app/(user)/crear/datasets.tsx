"use client";

import Swal from 'sweetalert2'
import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import FieldInputFile from '@/components/inputFile/field';
import NavCrear from '@/components/nav/navCrear';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import BannerInput from '@/components/inputFile/banner/bannerInputFile';

export default function CrearDataset() {
    const { data: session } = useSession();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [readme, setValue] = useState<string>("# Acerca del Dataset");
    const [files, setFiles] = useState<File[]>([]);
    const [imgHeader, setHeaderImage] = useState<File>();

    const router = useRouter()

    const handleChangeFiles = (files: File[]) => setFiles(files);

    const handleSubmit = (e: any) => {
        if (!readme.trim() || files.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, completa todos los campos obligatorios',
            })
        }

        const data = new FormData();
        data.append('title', title.trim());
        data.append('description', description.trim());
        data.append('readme', readme.trim());

        files.forEach((file, i) => data.append(`files`, file, file.name));
        
        if(readme.trim()){
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
                if(data.err && data.err.name === "TokenExpiredError"){
                    // renovar token
                    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         'Authorization': `${session?.accessToken}`
                    //     },
                    //     body: JSON.stringify({ token: session?.accessToken })
                    // });
                }
                console.log(data)
                if (data.err || data.error) {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.details || data.message,
                    })
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Dataset creado',
                    text: 'El dataset se ha creado correctamente',
                })
                router.push(`/datasets/${data.id}`)
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err,
                })
            })
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
                router.back()
            }
        })
    }
    
    const accept = {
        "image": [".png", ".jpeg", ".jpg", ".webp"],
    }

    const handleMetadataChange = (newTitle: string, newDescription: string) => {
        setTitle(newTitle);
        setDescription(newDescription);
    };

    return (
        <div className="mx-auto w-5/6 h-full">
            <NavCrear onSubmit={handleSubmit} onCancel={handleCancel} />
            <section className='mb-5'>
                <BannerInput onFilesChange={setHeaderImage} accept={accept} onMetadataChange={handleMetadataChange}/>
            </section>
            <section className='mb-5'>
                <div className='border-b border-morado mb-5 w-auto pr-4'>
                    <h1 className='font-notojp text-xl mb-2'>A cerca del Dataset</h1>
                </div>
                <MDEditor
                    value={readme}
                    onChange={setValue}
                />
            </section>
            <section className='mb-5'>
                <div className='border-b border-morado mb-5 w-auto pr-4'>
                    <h1 className='font-notojp text-xl mb-2'>Subir archivos</h1>
                </div>
                <FieldInputFile onFilesChange={handleChangeFiles} />
            </section>
        </div>
    )
}