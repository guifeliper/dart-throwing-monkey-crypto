import { env } from "@/env.mjs"
import { NextResponse } from "next/server"
import { Kraken } from "node-kraken-api"
import { z } from "zod"

export async function GET() {
  try {
    const kraken = new Kraken({
      key: env.KRANKEN_API_KEY,
      secret: env.KRANKEN_SECRET_KEY,
    })

    const assetPairs = await kraken.assetPairs()

    const instruments = Object.values(assetPairs)
      .map((pair) => ({
        name: pair.altname,
        symbol: pair.base,
        quote: pair.quote,
        type: "crypto",
      }))
      .filter((pair) => pair.quote === "ZUSD")

    return NextResponse.json(
      {
        assets: instruments,
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
