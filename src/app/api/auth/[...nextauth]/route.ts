import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth/core"
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcrypt";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("Missing credentials");

        const { email, password } = credentials as Credentials;

        const { data: user, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", email)
        .single();

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
          email: user.email,
          image: user.image,
        };
      }
    })
  ]
}

export const { auth } = NextAuth(authOptions)