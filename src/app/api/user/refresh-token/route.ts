// pages/api/refresh-token.ts

import jwt from 'jsonwebtoken';
import RefreshToken from '@/database/refreshToken';
import Usuario from '@/database/user';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
        return NextResponse.json({ message: 'No refresh token provided' }, {status: 400});
    }

    try {
        const tokenRecord = await RefreshToken.getToken(refreshToken);

        if (!tokenRecord) {
            return NextResponse.json({ message: 'Invalid refresh token' }, {status: 401});
        }

        const usuario = await Usuario.getByID(tokenRecord.user_id);

        if (!usuario) {
            return NextResponse.json({ message: 'User not found' }, {status: 401});
        }

        // Generar un nuevo access token
        const newAccessToken = jwt.sign(
            {
                id: usuario.uuid,
                email: usuario.email,
                username: usuario.username,
                name: usuario.username,
            },
            process.env.NEXTAUTH_SECRET!,
            { expiresIn: '3d' }
        );

        return NextResponse.json({ accessToken: newAccessToken }, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, {status: 500});
    }
}

export async function GET() {
    return NextResponse.json({ message: 'GET method not allowed' }, { status: 405 });
}
