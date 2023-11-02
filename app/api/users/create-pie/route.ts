import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { Pie } from "@prisma/client"
import { NextApiResponse } from "next"
import { getServerSession } from "next-auth"

type PieFormSchema = {
  name: string
  description: string
  target: number
  type: string
  authorId: string
  slices: {
    asset: string
    target: number
  }[]
}

export async function POST(
  req: Request,
  res: NextApiResponse<Pie | { message: string }>
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" })
    return
  }

  const session = await getServerSession(authOptions)

  if (!session?.user || !session?.user.email) {
    return new Response(null, { status: 403 })
  }

  const pieFormSchema: PieFormSchema = await req.json()
  console.log("body", JSON.stringify(pieFormSchema))

  try {
    const pie = await db.pie.create({
      data: {
        name: pieFormSchema.name,
        description: pieFormSchema?.description ?? "",
        target: pieFormSchema?.target ?? 0,
        type: "KRAKEN",
        authorId: session?.user.id,
        slices: {
          create: pieFormSchema.slices,
        },
      },
      include: {
        slices: true,
      },
    })
    return new Response(JSON.stringify(pie), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    })
  }
}
