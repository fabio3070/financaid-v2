import "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
  }

  interface Session {
    accessToken?: string
    expiresAt?: number
    user: User
  }

  interface JWT {
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
  }
} 