import getYearWeekString from "@/utils/getYearWeekString"
import { TokenDrawn } from "@prisma/client"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"
interface TokenPrice {
  name: any
  symbol: any
  price: any
}

export const dynamic = "force-dynamic"
export const revalidate = 60 * 60 * 24 * 6
export async function GET() {
  const tokensToUpdate = (await getTokenDrawn()) as TokenDrawn[]

  if (!Array.isArray(tokensToUpdate)) {
    return NextResponse.json(
      { message: "Error on data to update" },
      { status: 500 }
    )
  }
  const tokensPrice =
    ((await getCurrentTokenList(tokensToUpdate)) as TokenPrice[]) ?? []

  await Promise.all(
    tokensToUpdate?.map((token) => {
      if (!Array.isArray(tokensPrice)) {
        return {}
      }
      const price = tokensPrice?.find(
        (tokenPrice: { symbol: string }) =>
          tokenPrice.symbol.toLocaleLowerCase() ==
          token.symbol.toLocaleLowerCase()
      )?.price

      const percentageDifference =
        ((price - Number(token.priceAtDrawn)) / Number(token.priceAtDrawn)) *
        100
      return updateTokenDrawn(token, price, percentageDifference)
    })
  )
    .then(() => {
      console.log("Updated the items")
    })
    .catch((err) => console.error("Some error on updating", err))

  return NextResponse.json({ message: "Updated Successfully" }, { status: 200 })
}

async function getCurrentTokenList(tokensToUpdate: TokenDrawn[]) {
  try {
    const tokens = tokensToUpdate?.map((token) => token.symbol)
    const tokensString = tokens.join(",")

    const url =
      `${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/quotes/latest?symbol=${tokensString}` ??
      ""
    var options = {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API ?? "",
      },
      next: { revalidate: 60 * 60 * 24 * 6 },
    }
    const data = await fetch(url, options)
      .then((res) => res.json())
      .then((res) => res.data)

    const result = Object.values(data).map((token: any) => {
      return {
        name: token.name,
        symbol: token.symbol,
        price: token.quote.USD.price,
      }
    })
    if (result?.length < 0) {
      throw new Error("Data not found")
    }
    return result
  } catch (error) {
    console.error("Request error", error)
    return NextResponse.json(
      { message: "Error on update data" },
      { status: 500 }
    )
  }
}

async function updateTokenDrawn(
  data: TokenDrawn,
  newPrice: number,
  percentageDifference: number
) {
  try {
    return await db.tokenDrawn.update({
      where: {
        id: data.id,
      },
      data: {
        priceAtContest: newPrice,
        percentageDifference: percentageDifference,
      },
    })
  } catch (error) {
    console.error("Request error", error)
    return NextResponse.json(
      { message: "Error on update data", name: data.name },
      { status: 500 }
    )
  }
}

async function getTokenDrawn() {
  try {
    const getCurrentWeek = getYearWeekString()
    const result = await db.tokenDrawn.findMany({
      where: {
        timeframe: getCurrentWeek,
      },
    })
    if (result.length < 0) {
      throw new Error("Data not available")
    }

    return result
  } catch (error) {
    console.error("Request error", error)
    return NextResponse.json(
      { message: "Error on update data" },
      { status: 500 }
    )
  }
}
