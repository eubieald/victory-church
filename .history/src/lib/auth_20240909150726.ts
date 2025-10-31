import { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@/lib/db";
import { compare } from "bcrypt";
import FacebookProvider from "next-auth/providers/facebook";
import Email from "next-auth/providers/email";

interface ExtendedUser extends User {
  username: string;
  provider?: 'credentials' | 'facebook';
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
        Email: { label: "Email", type: "text", placeholder: "johndoe@mail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.Email || !credentials?.password) {
          return null;  // Reject if credentials are not provided
        }

        const existingUser = await db.user.findUnique({
          where: {
            username: credentials.Email
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
          provider: 'credentials'
        };
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      async profile(profile) {
        // Generate a username if it's not provided by Facebook
        const username = profile.name?.replace(/\s+/g, '').toLowerCase() || `user_${profile.email.split('@')[0]}`;

        // Find or create the user
        let user = await db.user.findUnique({
          where: { email: profile.email }
        });

        if (!user) {
          user = await db.user.create({
            data: {
              username,
              email: profile.email,
              password: '', // Placeholder or default value
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          });
        }

        return {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
          provider: 'facebook',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: ExtendedUser }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.provider = user.provider; // Ensure provider info is added to the token
      }
      return token;
    },
    async session({ session, token }: { session: any, token: JWT }) {
      session.user = {
        ...session.user,
        username: token.username as string,
        email: token.email as string,
        provider: token.provider as 'credentials' | 'facebook', // Ensure provider info is added to the session
      };
      return session;
    },
  }
};
