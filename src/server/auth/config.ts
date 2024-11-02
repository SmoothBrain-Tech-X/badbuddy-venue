import login from "@/services/login/login.service";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      access_token: string;
    } & DefaultSession["user"];
  }

  interface User {
    access_token: string;
  }
}
export const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await login({
          email: credentials.email! as string,
          password: credentials.password! as string,
        });

        return {
          access_token: res.access_token,
          email: res.user.email,
          name: `${res.user.first_name} ${res.user.last_name}`,
          id: res.user.id,
          image: res.user.avatar_url,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
