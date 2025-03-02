import NextAuth from "next-auth"
import { createClient } from "@supabase/supabase-js";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserService } from "./services/userService";

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

            console.log("auth.ts: ", username, password);

            const user = await UserService.getUserByUsername(username);

            console.log('user: ', user);

            if (!user) {
              throw new Error('Authentication failed, user not found');
            };

            console.log("✅ User found, authenticating...");

            const session = await UserService.authenticateUser(user.email, password);

            if (!session) {
              console.error('Authentication failed, user not authorized');
              return null;
            }
            
            return {
              id: user.id,
              name: user.username,
              email: user.email,
              accessToken: session.access_token,
              refreshToken: session.refresh_token,
              expiresAt: session.expires_at,
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