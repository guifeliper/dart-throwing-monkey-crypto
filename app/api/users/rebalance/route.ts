import { executeTradePlan } from "@/lib/execute-trade-plan"
import { generateTradePlan } from "@/lib/generate-trade-plan"
import { getKrakenBalance } from "@/lib/get-kraken-balance"
import { NextResponse } from "next/server"
import { z } from "zod"

const carteira = [
  { asset: "XETH", weight: 0 },
  { asset: "XXBT", weight: 0 },
  { asset: "MATIC", weight: 0 },
  { asset: "LDO", weight: 0 },
  { asset: "LINK", weight: 0 },
  { asset: "DOT", weight: 0 },
  { asset: "UNI", weight: 0 },
  { asset: "OP", weight: 0 },
  { asset: "ARB", weight: 0 },
  { asset: "USD", weight: 100 },
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

    await executeTradePlan(tradePlan)

    return NextResponse.json({ tradePlan }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    console.log(error)
    return new Response(null, { status: 500 })
  }
}
