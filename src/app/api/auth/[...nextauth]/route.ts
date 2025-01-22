import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { Session, User } from "next-auth"
import type { AuthConfig } from "@auth/core"
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

interface Credentials {
  name: string;
  email: string;
  password: string;
}

export const authOptions: AuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        name: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("Missing credentials");

        const { name, email, password } = credentials as Credentials;

        const { data: user, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", name)
        .single();

        console.log(user);

        if (error || !user) {
          throw new Error("No user found");
        };

        const isValid = await bcrypt.compare(password, user.password_hash);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          name: user.name,
          email: email
        };
      }
    })
  ],
  pages: {
    signIn: "/app/(auth)/login",
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.sub && session.user) {
        //tem de haver uma sessão já iniciada
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.sub = user.id; // Include user ID in JWT
      }
      return token;
    },
  },
}

export const { auth } = NextAuth(authOptions)