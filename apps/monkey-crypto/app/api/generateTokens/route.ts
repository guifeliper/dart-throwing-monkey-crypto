/* eslint-disable turbo/no-undeclared-env-vars */
import selectTokens from "@/utils/selectTokens";
import getYearWeekString from "@/utils/getYearWeekString";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = process.env.COINMARKETCAP_URL ?? "";
  var options = {
    headers: {
      "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API ?? "",
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

  console.log("weekday", getYearWeekString());
  const selectedTokens = selectTokens(tokensList, 10);
  console.log("selectedTokens", selectedTokens);
  return await addTokensDrawn(selectedTokens);
}

async function addTokensDrawn(data: any) {
  try {
    const result = await prisma.tokenDrawn.createMany({ data });
    console.log("my result", result);
    return new Response("Add Successfully", { status: 200 });
  } catch (error) {
    console.error("Request error", error);
    return new Response("Erro on add new items", { status: 500 });
  }
}
