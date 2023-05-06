/* eslint-disable turbo/no-undeclared-env-vars */
import selectTokens from "@/utils/selectTokens";
import getYearWeekString from "@/utils/getYearWeekString";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 10;
export async function GET(request: Request) {
  const url =
    `${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/listings/latest?limit=100` ??
    "";
  var options = {
    headers: {
      "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API ?? "",
    },
    next: { revalidate: 60 },
  };

  const res = await fetch(url, options);
  const data = await res.json();

  const tokensList =
    data?.data?.map((token: any) => {
      return {
        name: token.name,
        symbol: token.symbol,
        priceAtDrawn: token.quote["USD"].price,
        priceAtContest: 0,
        category: "100",
        timeframe: getYearWeekString(),
      };
    }) ?? [];

  if (tokensList?.length == 0) {
    return NextResponse.json(
      { message: "Error on token list" },
      { status: 500 }
    );
  }
  const selectedTokens = selectTokens(tokensList, 10);
  return await addTokensDrawn(selectedTokens);
}

async function addTokensDrawn(data: any) {
  try {
    await prisma.tokenDrawn.createMany({ data });
    return NextResponse.json({ message: "Add Successfully" }, { status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ message: "Error on add" }, { status: 500 });
  }
}
