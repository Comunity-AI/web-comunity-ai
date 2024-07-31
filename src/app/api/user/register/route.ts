import Usuario from '@/database/user'; // Ajusta la ruta
import { signIn } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, username, nombres, password } = await request.json();

    if (!username || !password) {
        return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    const user = await Usuario.create({ email, username, nombres, rawPassword: password, pais: null });
    // Si el usuario se crea correctamente, iniciar sesión
    if (user) {
        const result = await signIn('credentials', {
            redirect: false, // No redirigir automáticamente
            username,
            password,
        });

        if (result?.ok) {
            // Autenticación exitosa, devolver una respuesta que el cliente puede usar para redirigir
            return NextResponse.json({ message: 'User created and logged in successfully' }, { status: 201 });
        } else {
            return NextResponse.json({ message: 'Failed to log in after registration' }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: 'User creation failed' }, { status: 500 });
    }

}

export async function GET() {
    return NextResponse.json({ message: 'GET method not allowed' }, { status: 405 });
}
