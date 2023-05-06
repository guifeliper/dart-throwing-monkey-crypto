/* eslint-disable turbo/no-undeclared-env-vars */
import selectTokens from "@/utils/selectTokens";
import getYearWeekString from "@/utils/getYearWeekString";
import { PrismaClient, TokenDrawn } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const revalidate = 10;
export async function GET() {
  const getCurrentWeek = getYearWeekString();
  const tokensToUpdate = await prisma.tokenDrawn.findMany({
    where: {
      category: "100",
      timeframe: getCurrentWeek,
    },
  });
  const tokens = tokensToUpdate.map((token) => token.symbol);
  const tokensString = tokens.join(",");
  const tokensPrice = await getCurrentTokenList(tokensString);

  await Promise.all(
    tokensToUpdate.map((token) => {
      const price = tokensPrice.find(
        (tokenPrice: { symbol: string }) =>
          tokenPrice.symbol.toLocaleLowerCase() ==
          token.symbol.toLocaleLowerCase()
      )?.price;
      return updateTokenDrawn(token, price);
    }) // returns an array of Promises
  );

  return NextResponse.json(
    { message: "Updated Successfully" },
    { status: 200 }
  );
}

async function getCurrentTokenList(tokensString: string) {
  const url =
    `${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/quotes/latest?symbol=${tokensString}` ??
    "";
  var options = {
    headers: {
      "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API ?? "",
    },
    next: { revalidate: 60 },
  };
  const data = await fetch(url, options)
    .then((res) => res.json())
    .then((res) => res.data);

  const result = Object.values(data).map((token: any) => {
    return {
      name: token.name,
      symbol: token.symbol,
      price: token.quote.USD.price,
    };
  });
  return result;
  // /v1/cryptocurrency/quotes/latest?symbol=HBAR,API3,TFUEL,ZEN,BTG,HNT,AUDIO,XYM,ERG,BSW,NEXO,CAKE,XDC,UNI,BCH,LINK,BAT,AXS,CRO,CRV
}

async function updateTokenDrawn(data: TokenDrawn, newPrice: number) {
  try {
    return await prisma.tokenDrawn.update({
      where: {
        id: data.id,
      },
      data: {
        priceAtContest: newPrice,
      },
    });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json(
      { message: "Error on update data", name: data.name },
      { status: 500 }
    );
  }
}
