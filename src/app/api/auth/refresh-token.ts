// pages/api/refresh-token.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import RefreshToken from '@/database/refreshToken';
import Usuario from '@/database/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'No refresh token provided' });
    }

    try {
      const tokenRecord = await RefreshToken.getToken(refreshToken);

      if (!tokenRecord) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }

      const usuario = await Usuario.getByID(tokenRecord.user_id);

      if (!usuario) {
        return res.status(401).json({ message: 'User not found' });
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

      return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
