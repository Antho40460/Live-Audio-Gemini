import { DefaultSession, DefaultUser } from 'next-auth'
import { Role } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: Role
      creditsMinutes: number
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: Role
    creditsMinutes: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid: string
    role: Role
    creditsMinutes: number
  }
}