import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { PieFormSchema } from "@/types"
import { Pie } from "@prisma/client"
import { NextApiResponse } from "next"
import { getServerSession } from "next-auth"

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
    const pieId = pieFormSchema.id

    await db.slice.deleteMany({
      where: {
        pieId: pieId,
      },
    })

    const pie = await db.pie.update({
      where: { id: pieId },
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
