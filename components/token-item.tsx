import React from "react"
import TokenIcon from "./token-icon"
import { TokenDrawn } from "@prisma/client"

interface TokenItemProps {
  token: Pick<TokenDrawn, "id" | "name" | "symbol" | "priceAtDrawn">
}

export function TokenItem({ token }: TokenItemProps) {
  return (
    <li className="my-2 flex items-center justify-between gap-x-6">
      <div className="flex gap-x-4">
        <div className="flex items-center justify-center">
          <TokenIcon symbol={token.symbol} />
        </div>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-white">
            {token.name}
          </p>
          <p className="truncate text-xs leading-5 text-gray-400">
            {token.symbol}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-white">
          {token.priceAtDrawn.toString()}
        </p>
        <p className="text-xs leading-5 text-gray-400">Bought at</p>
      </div>
    </li>
  )
}

export default TokenItem
