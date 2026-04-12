import { signIn as firebaseSignIn, signInWithGoogle } from "@/utils/db/servicefirebase";
import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";

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
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user: any = await firebaseSignIn(credentials.email);
        
        if (user) {
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordValid) {
            return {
              id: user.id,
              email: user.email,
              fullname: user.fullname,
              role: user.role?.trim() || "user",
              image: user.image || `https://ui-avatars.com/api/?name=${user.fullname}`
            };
          }
        }
        return null;
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user, account }) {
      // Logic Sinkronisasi untuk Social Login (Google & GitHub)
      if ((account?.provider === "google" || account?.provider === "github") && user) {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: account.provider,
        };

        try {
          const result: any = await new Promise((resolve) => {
            signInWithGoogle(data, (res: any) => resolve(res));
          });

          if (result.status) {
            token.fullname = result.data.fullname;
            token.email = result.data.email;
            token.image = result.data.image;
            token.type = result.data.type;
            token.role = result.data.role;
          }
        } catch (error) {
          console.error(`Error during ${account.provider} Sync:`, error);
        }
      }

      // Logic untuk Credentials
      if (user && account?.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
        token.image = user.image; 
        token.type = "credentials";
      }
      
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email;
        session.user.fullname = token.fullname;
        session.user.role = token.role;
        session.user.type = token.type;
        session.user.image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);