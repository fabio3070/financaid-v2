import "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: string
    email: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
  }

  interface Session {
    user: User
    accessToken: string
    expiresAt: number
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string
    email?: string
    firstName?: string
    lastName?: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
  }
} 