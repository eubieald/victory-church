import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/lib/db";
import { compare } from "bcrypt";
import FacebookProvider from "next-auth/providers/facebook";

interface ExtendedUser extends User {
  username: string;
  provider?: string;
}

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
          email: existingUser.email,
          provider: 'credentials' as 'credentials' | 'facebook'
        };
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any, user?: ExtendedUser }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        // Add provider info if available
        token.provider = user.provider || 'facebook';  // Default to 'facebook' for Facebook login
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        username: token.username as string,
        email: token.email,
        // Add provider info to session
        provider: token.provider || 'facebook'
      };
      return session;
    },
  }
};
