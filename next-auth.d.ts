// next-auth.d.ts
import NextAuth from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession['user'];
    accessToken?: string | JWT;
  }

  interface User {
    id: string;
    username: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    accessToken?: string;
  }
}