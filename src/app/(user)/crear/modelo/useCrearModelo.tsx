import Swal from 'sweetalert2';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApi } from '@/helpers/cache';
import { ResponseFramework } from '../../interfaces/interfaces';

export function useCrearModelo() {
    const { data: session } = useSession();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [readme, setValue] = useState("# Guia de uso para el modelo \nAñade una guia de uso para el modelo");
    const [framework, setFramework] = useState("")
    const [license, setLicense] = useState("")

    const [files, setFiles] = useState<File[]>([]);
    const [imgHeader, setHeaderImage] = useState(null);

    const router = useRouter();

    const handleChangeFiles = (files: File[]) => setFiles(files);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !framework.trim() || !license.trim() || files.length === 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, completa todos los campos obligatorios',
            });
        }

        const data = new FormData();
        data.append('title', title.trim());
        data.append('description', description.trim());
        data.append('framework', framework.trim());
        data.append('license', license.trim());

        files.forEach((file) => data.append('files', file, file.name));

        if (imgHeader) {
            data.append('banner', imgHeader);
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/crear/modelo`, {
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

                if (data.error) {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: data.details,
                    });
                }

                Swal.fire({
                    icon: 'success',
                    title: 'Modelo creado',
                    text: 'Tu Modelo se ha creado correctamente!!',
                });

                router.push(`/modelos/${data.id}`);
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

    const handleMetadataChange = (newTitle: string, newDescription: string) => {
        setTitle(newTitle);
        setDescription(newDescription);
    };

    const { data: dataItems, error: dataError, status: dataStatus, notFound: DataNotFound } = useApi<ResponseFramework[]>(`api/v1/list/frameworks`)
    const { data: dataLicenses, error: errorLicenses, status: statusLicenses, notFound: notFoundLicenses } = useApi<ResponseFramework[]>(`api/v1/list/licenses`)

    const status = dataStatus === 'fetched' && statusLicenses === 'fetched' ? "fetched" : "fetching";
    const error = dataError || errorLicenses;

    return {
        items: dataItems,
        title, setTitle,
        description, setDescription,
        files, setFiles, handleChangeFiles,
        readme, setValue,
        imgHeader, setHeaderImage,
        handleSubmit, handleCancel, handleMetadataChange,
        framework, setFramework,
        license, setLicense
    }
}