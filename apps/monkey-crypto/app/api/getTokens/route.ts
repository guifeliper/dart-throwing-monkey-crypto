import selectTokens from "@/utils/selectTokens";
import { NextResponse } from "next/server";

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
      price: token.quote["USD"].price,
      last_updated: token.last_updated,
    };
  });

  const selectedTokens = selectTokens(tokensList, 10);

  return NextResponse.json({ selectedTokens });
}
