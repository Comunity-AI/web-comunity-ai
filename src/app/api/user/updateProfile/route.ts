// app/api/updateProfile/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import Usuario from '@/database/user'; // Ajusta el path según tu estructura

interface UpdateProfileRequestBody {
    username: string;
    bio: string;
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { username, bio }: UpdateProfileRequestBody = await request.json();

    try {
        console.log({bio:session.user.bio})
        const res = await Usuario.updateUserProfile(session.user.uuid, { username, bio });
        if(res.changedRows && res.changedRows > 0){
            session.user.username = username;
            session.user.bio = bio;
        }
        return NextResponse.json({ message: 'Perfil actualizado exitosamente' });
    } catch (error) {
        console.error('Error actualizando el perfil:', error);
        return NextResponse.json({ error: 'Error al actualizar el perfil' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'GET method not allowed' }, { status: 405 });
}
