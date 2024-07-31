"use client";

import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function usePerfil(){
    const { data: session, status } = useSession()
    const [username, setUsername] = useState<string>('')
    const [editUsername, setEditUsername] = useState<string>('')
    const [bio, setBio] = useState<string>('');
    const [editBio, setEditBio] = useState<string>('')
    const [lenBio, setLenBio] = useState<number>(0)
    const [activeEdit, setActiveEdit] = useState<boolean>(false);

    useEffect(() => {
        if (session?.user) {
            setBio(session.user?.bio);
            setEditBio(session.user?.bio);
            setLenBio(session.user?.bio?.length || 0);
            
            setUsername(session.user?.username);
            setEditUsername(session.user?.username);
        }
    }, [session]);

    useEffect(() => {
        if (editBio && editBio.length > lenBio) {
            setLenBio(editBio.length);
        }
    }, [editBio]);


    // Dentro de tu componente Perfil
    const handleSave = async () => {
        try {
            const response = await fetch('/api/user/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, bio:editBio }),
            });
    
            if (!response.ok) {
                throw new Error('Error al actualizar el perfil');
            }
    
            const result = await response.json();
            Swal.fire('¡Éxito!', result.message, 'success'); // Mostrar mensaje de éxito
            handlerActiveEdit(false); // Salir del modo edición
            setUsername(editUsername);
            setBio(editBio);
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Error al actualizar el perfil', 'error');
        }
    }    

    const handlerActiveEdit = (val: boolean) => {
        setActiveEdit(val);
    }

    const user = session?.user

    return {
        user,
        username, setUsername,
        editUsername, setEditUsername,
        bio, lenBio, setBio,
        editBio, setEditBio,
        activeEdit, handlerActiveEdit,
        handleSave,
        status
    }
}