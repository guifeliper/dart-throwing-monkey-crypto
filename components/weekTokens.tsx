import React from "react"; 
import TokenItem from "./token-item";
import { TokenDrawn } from "@prisma/client";
interface WeekTokensProps {
  data: Pick<TokenDrawn, "id" | "name" | "symbol" | "priceAtDrawn">[];
}
 
export const WeekTokens = ({ data }: WeekTokensProps) => {
  return (
    <div>
      <div className="text-xl font-semibold not-italic">Week Tokens</div>
      <ul role="list" className="py-3">
        {data?.map((token) => (
          <TokenItem key={token.id} token={token} />
        ))}
      </ul>
    </div>
  );
};
