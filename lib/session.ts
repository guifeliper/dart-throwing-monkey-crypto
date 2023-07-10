import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { DefaultSession } from "next-auth"
interface UserSession extends NonNullable<DefaultSession["user"]> {
  id: string
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user as UserSession
}
