import { TokenDrawn } from "@prisma/client"
import selectTokens from "@/utils/selectTokens"
import getYearWeekString from "@/utils/getYearWeekString"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 60 * 60 * 24 * 6 // every 6 days
export async function GET(request: Request) {
  const url =
    `${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/listings/latest?limit=100` ??
    ""
  var options = {
    headers: {
      "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API ?? "",
    },
    next: { revalidate: 60 * 60 * 24 * 6 },
  }

  const res = await fetch(url, options)
  const data = await res.json()

  const tokensList: TokenDrawn[] =
    data?.data?.map((token: any) => {
      return {
        name: token.name,
        symbol: token.symbol,
        priceAtDrawn: token.quote["USD"].price,
        priceAtContest: 0,
        percentageDifference: 0,
        category: "Top-100",
        timeframe: getYearWeekString(),
      }
    }) ?? []

  const BTCBenchmark = tokensList
    .filter((token) => token.symbol === "BTC")
    .map((token) => ({ ...token, category: "BTC-benchmark" }))

  if (tokensList?.length == 0) {
    return NextResponse.json(
      { message: "Error on token list" },
      { status: 500 }
    )
  }
  const selectedTokens = selectTokens(tokensList, 10)
  return await addTokensDrawn([...selectedTokens, ...BTCBenchmark])
}

async function addTokensDrawn(data: any) {
  try {
    await db.tokenDrawn.createMany({ data })
    return NextResponse.json({ message: "Add Successfully" }, { status: 200 })
  } catch (error) {
    console.error("Request error", error)
    return NextResponse.json({ message: "Error on add" }, { status: 500 })
  }
}
