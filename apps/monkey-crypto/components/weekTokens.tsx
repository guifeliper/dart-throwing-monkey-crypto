import React from "react";
import TokenIcon from "./token-icon";

export const WeekTokens = () => {
  return (
    <div>
      <div className="text-xl not-italic font-semibold">Week Tokens</div>
      <TokenList />
    </div>
  );
};

const TOKEN = {
  id: "1",
  name: "Bitcoin",
  symbol: "ETH",
  price: "15.000",
};

function TokenList() {
  return (
    <>
      <ul role="list" className="py-3">
        {Array(10)
          .fill({ ...TOKEN })
          .map((token) => (
            <li key={token.id} className="flex items-center justify-between my-2 gap-x-6">
              <div className="flex gap-x-4">
                <div className="flex items-center justify-center">
                  <TokenIcon symbol={token.symbol} />
                </div>
                <div className="flex-auto min-w-0">
                  <p className="text-sm font-semibold leading-6 text-white">
                    {token.name}
                  </p>
                  <p className="text-xs leading-5 text-gray-400 truncate">
                    {token.symbol}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-white">15.000</p>
                <p className="text-xs leading-5 text-gray-400">
                  Bought at
                </p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
