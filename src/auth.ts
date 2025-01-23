import NextAuth from "next-auth"
import { createClient } from "@supabase/supabase-js";
import CredentialsProvider from "next-auth/providers/credentials";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const { auth, signIn, signOut, handlers:{GET, POST} } = NextAuth({
    debug: true,
    session: {
      strategy: "jwt",
    },
    
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
        name: "credentials",
        credentials: {
            username: {},
            password: {},
        },
        async authorize(
          credentials: Partial<Record<"username" | "password", unknown>>
        ) {
            const username = credentials.username as string;
            const password = credentials.password as string;
            
            if (!username || !password) {
                return null;
            }

            const { data: user, error } = await supabase
            .from("Users")
            .select("*")
            .eq("username", username)
            .single();

            console.log(user);

            if (error || !user) {
              console.log(error);
              throw new Error("No user found");
            };
            
            return {
              id: user.id,
              name: user.name,
              email: user.email
            };
        },
    })
  ],
});