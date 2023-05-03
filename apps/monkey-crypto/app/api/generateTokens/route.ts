import selectTokens from "@/utils/selectTokens";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import getYearWeekString from "@/utils/getYearWeekString";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url =
    "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100";
  var options = {
    headers: {
      "X-CMC_PRO_API_KEY": "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c",
    },
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
    await prisma.tokenDrawn.createMany({ data });
    return new Response("Add Successfully", { status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return new Response("Erro on add new items", { status: 500 });
  }
}
