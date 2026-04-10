import { signIn } from "@/utils/db/servicefirebase";
import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// 1. Module Augmentation untuk Type Safety
declare module "next-auth" {
  interface Session {
    user: {
      fullname?: string | null;
      role?: string | null; // Tambahkan role di sini
    } & DefaultSession["user"]
  }

  interface User {
    fullname?: string | null;
    role?: string | null; // Tambahkan role di sini
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fullname?: string | null;
    role?: string | null; // Tambahkan role di sini
  }
}

// 2. Konfigurasi NextAuth
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        fullname: { label: "Full Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user: any = await signIn(credentials.email);
        
        if (user) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password, 
            user.password
          );

          if (isPasswordValid) {
            return {
              id: user.id,
              email: user.email,
              fullname: user.fullname,
              role: user.role, 
            };
          }
        }
        return null;
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role; // Masukkan role ke dalam token
      }
      return token;
    },
    async session({ session, token }) {
      // PERBAIKAN: Cek ketersediaan data di dalam token, lalu masukkan ke session.user
      if (token) {
        session.user.email = token.email;
        session.user.fullname = token.fullname;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);