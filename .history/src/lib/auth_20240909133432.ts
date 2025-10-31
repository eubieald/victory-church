import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/lib/db";
import { compare } from "bcrypt";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "johndoe@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;  // Reject if credentials are not provided
        }

        const existingUser = await db.user.findUnique({
          where: {
            username: credentials.username
          }
        });

        if (!existingUser) {
          return null;  // User not found
        }

        // Verify password
        const passwordMatch = await compare(credentials.password, existingUser.password);
        if (!passwordMatch) {
          return null;  // Password does not match
        }

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email
        };
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          email: user.email
        }
      }
      return token
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          email: token.email
        }
      }
    },
  }
};
