import { env } from "@/env.mjs"
import { authOptions } from "@/lib/auth"
import { mergeBalanceObjects } from "@/lib/utils"
import { Kraken as PrivateKraken } from "@/services/kraken"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { Kraken } from "node-kraken-api"
import { z } from "zod"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }
    const quote = "ZUSD"
    const privateKraken = new PrivateKraken()
    const kraken = new Kraken({
      key: env.KRANKEN_API_KEY,
      secret: env.KRANKEN_SECRET_KEY,
    })

    const balance = await kraken.balance()
    const assets: any = ((await privateKraken.assetPairs()) as any).result
    let totalBalanceUsd = 0

    const data = await Promise.all(
      Object.entries(balance).map(async ([currency, value]) => {
        const currencyValue = currency.split(".")[0]
        if (currencyValue === "ZUSD") {
          return {
            asset: currencyValue,
            quantity: value,
            pair: null,
            totalFIAT: 1,
          }
        } else {
          const assetPairs = Object.values(assets).filter(
            (asset) =>
              (asset as any).base === currencyValue &&
              (asset as any).quote === quote
          )[0]?.["altname"]

          const ticker = await privateKraken.ticker(assetPairs)
          const lastPrice = (
            Object.entries((ticker as any).result) as any
          )[0][1].c[0]
          console.log(currency, value, assetPairs, lastPrice)
          totalBalanceUsd += parseFloat(value) * lastPrice

          return {
            asset: currencyValue,
            quantity: value,
            pair: assetPairs,
            value: lastPrice,
            totalFIAT: parseFloat(value) * lastPrice,
          }
        }
      })
    )

    return NextResponse.json(
      { totalBalanceFIAT: totalBalanceUsd, data: mergeBalanceObjects(data) },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
