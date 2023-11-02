import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

    const pies = await db.pie.findMany({
      where: {
        authorId: session?.user.id,
      },
      include: {
        slices: true,
      },
    })

    return NextResponse.json(pies, { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(null, { status: 500 })
  }
}
