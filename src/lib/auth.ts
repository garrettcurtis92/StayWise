import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// If your Prisma client is exported from src/lib/db.ts, ensure that file exists and exports 'prisma'.
// Otherwise, import directly from @prisma/client as below:
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma), // <-- This must use your Prisma client
  session: { strategy: "database" as const },
  // ...other options
};