import { generateTradePlan } from "@/lib/generate-trade-plan"
import { getKrakenBalance } from "@/lib/get-kraken-balance"
import { NextResponse } from "next/server"
import { z } from "zod"

const carteira = [
  { asset: "XETH", weight: 42.41 },
  { asset: "XXBT", weight: 29.11 },
  { asset: "MATIC", weight: 7.26 },
  { asset: "LDO", weight: 7.03 },
  { asset: "LINK", weight: 1.15 },
  { asset: "DOT", weight: 0.64 },
  { asset: "UNI", weight: 0.52 },
  { asset: "OP", weight: 0.21 },
  { asset: "ARB", weight: 0.19 },
  { asset: "USD", weight: 11.48 },
]

export async function GET() {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session?.user || !session?.user.email) {
    //   return new Response(JSON.stringify({ totalBalanceFIAT: 0, data: [] }), {
    //     status: 403,
    //   })
    // }
    const { data, totalBalanceUsd } = await getKrakenBalance()

    const tradePlan = await generateTradePlan(
      carteira,
      data,
      totalBalanceUsd,
      10
    )

    // await executeTradePlan(tradePlan)

    return NextResponse.json({ tradePlan }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    console.log(error)
    return new Response(null, { status: 500 })
  }
}
