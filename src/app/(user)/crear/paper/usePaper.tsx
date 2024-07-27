import Swal from 'sweetalert2';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { ResponseAPI } from '@/app/(user)/interfaces/interfaces';

export function usePaper(){
    const { data: session } = useSession();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File|null>(null);
    const [imgHeader, setHeaderImage] = useState(null);
    
    const router = useRouter();
    const accept = ["doc", "docx", "pdf", "md"]

    const handleChangeFile = useCallback((files: File[]) => {
        if (accept.includes(files[0].name.split('.').pop()!)) {
            setFile(files[0]);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Tipo de archivo no permitido',
                text: 'Por favor selecciona un archivo con una extensión válida',
            });
        }
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if(!file){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, selecciona un archivo',
            });
        }

        if (!title.trim() || !description.trim() || file?.size === 0) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, completa todos los campos obligatorios',
            });
        }

        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('description', description.trim());
        formData.append('file', file, file?.name);
        
        if(imgHeader) 
            formData.append('banner', imgHeader);

        const response: ResponseAPI = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/crear/paper`, {
            method: 'POST',
            headers: {
                'Authorization': `${session?.accessToken}`
            },
            body: formData,
        }).then(res => res.json());
        if (response.error) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.details,
            });
        }

        Swal.fire({
            icon: 'success',
            title: 'Paper creado',
            text: 'El Paper se ha creado correctamente',
        });

        router.push(`/paper/${response.id}`);
    };

    const handleCancel = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se perderán los cambios no guardados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/paper');
            }
        });
    };

    return {
        title,
        setTitle,
        description,
        setDescription,
        file,
        setFile,
        imgHeader,
        setHeaderImage,
        handleChangeFile,
        handleSubmit,
        handleCancel
    };
}
