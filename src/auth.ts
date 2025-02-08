import NextAuth from "next-auth"
import { createClient } from "@supabase/supabase-js";
import CredentialsProvider from "next-auth/providers/credentials";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export const {auth, handlers: {GET, POST}, signIn, signOut } = NextAuth({
    debug: true,
    session: {
      strategy: "jwt",// verificar o propósito
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

            // tem que ser movido para um sitio onde possa ser escalavel(manutenção, mudado)
            const { data: user, error } = await supabase
            .from("Users")
            .select("*")
            .eq("username", username)
            .single();

            if (error || !user) {
              console.log(error);
              throw new Error("No user found");
            };

            console.log(user);

            // Get token from Supabase(testar)
            const { data, error: authError } = await supabase.auth.signInWithPassword({
              email: user.email,
              password: password,
            });

            if (authError || !data.session) {
              throw new Error("Invalid credentials");
            }
            
            return {
              id: user.id,
              name: user.username,
              email: user.email,
              accessToken: data.session.access_token,
              refreshToken: data.session.refresh_token,
              expiresAt: data.session.expires_at,
            };
        },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresAt = user.expiresAt;

        if (typeof token.expiresAt === 'number' && Date.now() / 1000 > token.expiresAt) {
          const { data, error } = await supabase.auth.refreshSession({
            refresh_token: token.refreshToken as string,
          });
  
          if (!error && data.session) {
            token.accessToken = data.session.access_token;
            token.expiresAt = data.session.expires_at;
            token.refreshToken = data.session.refresh_token;
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string;
      session.expiresAt = token.expiresAt as number;
      return session;
    },
  },
});