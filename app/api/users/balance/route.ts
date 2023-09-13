import { env } from "@/env.mjs"
import { calculateAssetWeights } from "@/lib/calculateAssetWeights"
import { mergeBalanceObjects } from "@/lib/utils"
import { Kraken as PrivateKraken } from "@/services/kraken"
import { NextResponse } from "next/server"
import { Kraken } from "node-kraken-api"
import { z } from "zod"

export async function GET() {
  try {
    // const session = await getServerSession(authOptions)

    // if (!session?.user || !session?.user.email) {
    //   return new Response(JSON.stringify({ totalBalanceFIAT: 0, data: [] }), {
    //     status: 403,
    //   })
    // }
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
      Object.entries(balance)
        .filter(([currency, value]) => Number(value) !== 0)
        .map(async ([currency, value]) => {
          const currencyValue = currency.split(".")[0]
          const assetPairs = Object.values(assets).filter(
            (asset) =>
              (asset as any).base === currencyValue &&
              (asset as any).quote === quote
          )[0]?.["altname"]
          console.log("assetPairs", assetPairs, currencyValue, quote)

          let lastPrice = 0
          if (!assetPairs) {
            lastPrice = 1
          } else {
            const ticker = await privateKraken.ticker(assetPairs)
            lastPrice = (Object.entries((ticker as any).result) as any)[0][1]
              .c[0]
          }

          totalBalanceUsd += parseFloat(value) * lastPrice
          return {
            asset: currencyValue,
            quantity: parseFloat(value),
            pair: assetPairs,
            value: lastPrice,
            totalFIAT: parseFloat(value) * lastPrice,
          }
        })
    )

    const noDuplicates = mergeBalanceObjects(data)
    const weighted = calculateAssetWeights(noDuplicates, totalBalanceUsd)
    return NextResponse.json(
      { totalBalanceFIAT: totalBalanceUsd, data: weighted },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
