import jwt from "jsonwebtoken";

import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import Usuario from "@/database/user"
import Pais from "@/database/pais"

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
          const usuario = new Usuario(user.name!.split(" ")[0] + user.id.slice(0, 6), user.email!, "", null);

          const existUser:boolean = await usuario.existUser()

          if (!existUser) {
            usuario.providerId = user.id
            usuario.profilePhoto = user.image!;
            usuario.save();
          }
          return true
        },
        
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;

            const usuario = await Usuario.getByEmail(user.email!)

            if(usuario?.pais){
              Pais.getByName(usuario.pais.nombre).then((pais) => {
                token.pais = pais;
              });
            }

            token.username = usuario?.username;
            console.log({username: usuario?.username})
            
            const userToken = jwt.sign(
              {
                id: user.id, 
                email: user.email,
                username: usuario?.username,
                name: user.name,
              },
              process.env.NEXTAUTH_SECRET!,
              { expiresIn: '3d' }
            );
    
            token.accessToken = userToken;
          }
          return token;
        },
        async session({session, token}) {
          if(session.user){
            session.user.id = token.id;
            session.user.username = token.username;
          }
          session.accessToken = token.accessToken;
          return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl + '/perfil';
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }