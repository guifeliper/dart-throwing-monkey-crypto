/* eslint-disable turbo/no-undeclared-env-vars */
import selectTokens from "@/utils/selectTokens";
import getYearWeekString from "@/utils/getYearWeekString";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const revalidate = 60;
export async function GET(request: Request) {
  const url = `${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/listings/latest?limit=100` ?? "";
  var options = {
    headers: {
      "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API ?? "",
    },
    next: { revalidate: 60 },
  };

  const res = await fetch(url, options);
  const data = await res.json();

  const tokensList = data?.data.map((token: any) => {
    return {
      name: token.name,
      symbol: token.symbol,
      priceAtDrawn: token.quote["USD"].price,
      priceAtContest: 0,
      category: "100",
      timeframe: getYearWeekString(),
    };
  });

  const selectedTokens = selectTokens(tokensList, 10);
  return await addTokensDrawn(selectedTokens);
}

async function addTokensDrawn(data: any) {
  try {
    const result = await prisma.tokenDrawn.createMany({ data });
    return NextResponse.json({ fields: "Add Successfully" }, { status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return NextResponse.json({ fields: "Error on add" }, { status: 500 });
  }
}
