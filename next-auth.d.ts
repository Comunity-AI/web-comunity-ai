// next-auth.d.ts
import NextAuth from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      username: string;
    } & DefaultSession['user'];
    accessToken?: string | JWT;
  }

  interface User {
    uuid?: string;
    id?: string;
    username: string;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    user: User;
    accessToken?: string;
  }
}
