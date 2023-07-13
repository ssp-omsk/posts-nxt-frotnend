import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    jwt: string;
    user: User & DefaultSession["user"];
  }

  interface User {
    id: string
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: Date
    updatedAt: Date
  }
}
