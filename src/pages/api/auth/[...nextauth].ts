import { signIn as firebaseSignIn } from "@/utils/db/servicefirebase";
import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import GoogleProvider from "next-auth/providers/google";

// 1. Module Augmentation untuk Type Safety
declare module "next-auth" {
  interface Session {
    user: {
      fullname?: string | null;
      role?: string | null;
      type?: string | null;
    } & DefaultSession["user"]
  }

  interface User {
    fullname?: string | null;
    role?: string | null;
    type?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fullname?: string | null;
    role?: string | null;
    type?: string | null;
    image?: string | null;
  }
}

// 2. Konfigurasi NextAuth
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
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

        const user: any = await firebaseSignIn(credentials.email);
        
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
              // Pastikan membersihkan spasi dari database jika ada
              role: user.role?.trim() || "user", 
            };
          }
        }
        return null;
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user, account }) {
      // Logic untuk Login Google
      if (account?.provider === "google" && user) {
        token.fullname = user.name;
        token.email = user.email;
        token.image = user.image;
        token.type = account.provider;
        // Opsional: set default role untuk user google jika tidak ada di DB
        token.role = token.role || "user"; 
      }

      // Logic untuk Login Credentials
      if (user && account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.fullname = token.fullname;
        session.user.role = token.role;
        session.user.type = token.type;
        if (token.image) {
            session.user.image = token.image;
        }

        if (token.type) {
            session.user.type = token.type;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);