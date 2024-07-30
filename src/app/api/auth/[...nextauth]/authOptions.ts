import jwt from "jsonwebtoken";
import crypto from "crypto"

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import Usuario from "@/database/user"
import Pais from "@/database/pais"
import RefreshToken from "@/database/refreshToken";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if(!credentials?.email || !credentials?.password) 
          throw new Error('Invalid credentials');

        const user = await Usuario.getByEmail(credentials.email); // Obtén el usuario por nombre de usuario
        if (!user) {
          throw new Error('No user found');
        }
        const isValid = await Usuario.checkUser(credentials.email, credentials.password); // Verifica la contraseña
        if (!isValid) {
          return null
          // throw new Error('Invalid password');
        }
        return user
      }
    }),
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
      console.log({ email: user })
      const usuario = await Usuario.getByEmail(user.email!);
      let currentUser = usuario;

      if (!usuario) {
        const newUsuario = new Usuario(null, user.name!.split(" ")[0] + user.id.slice(0, 6), user.email!, "", null);
        newUsuario.providerId = user.id
        newUsuario.profilePhoto = user.image!;
        currentUser = await newUsuario.save();
        if (!currentUser) {
          throw new Error("Login error")
        }
      }

      const refreshToken = crypto.randomBytes(32).toString('hex');
      await RefreshToken.upsertToken(crypto.randomUUID(), currentUser!.uuid, refreshToken);

      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;

        const usuario = await Usuario.getByEmail(user.email!)
        if (!usuario) {
          throw new Error("Login error")
        }

        if (usuario.pais) {
          Pais.getByName(usuario.pais.nombre).then((pais) => {
            token.pais = pais;
          });
        }

        token.user_uuid = usuario.uuid;
        token.username = usuario.username;
        token.refreshToken = await RefreshToken.getTokenByUserID(usuario.uuid);

        const userToken = jwt.sign(
          {
            uuid: usuario.uuid,
            id: user.id,
            email: user.email,
            username: usuario.username,
            name: user.name,
          },
          process.env.NEXTAUTH_SECRET!,
          { expiresIn: '3d' }
        );

        token.accessToken = userToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.uuid = token.user_uuid;
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