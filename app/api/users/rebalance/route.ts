import { authOptions } from "@/lib/auth"
import { generateTradePlan } from "@/lib/generate-trade-plan"
import { getKrakenBalance } from "@/lib/get-kraken-balance"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { z } from "zod"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(JSON.stringify({ totalBalanceFIAT: 0, data: [] }), {
        status: 403,
      })
    }
    if (req.method !== "POST") {
      NextResponse.json({ message: "Method not allowed" }, { status: 405 })
      return
    }
    const wallet = await req.json()

    const { data, totalBalanceUsd } = await getKrakenBalance()

    const tradePlan = await generateTradePlan(wallet, data, totalBalanceUsd, 10)

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
