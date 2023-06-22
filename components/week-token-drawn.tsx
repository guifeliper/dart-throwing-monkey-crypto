import TokenIcon from "./token-icon"
import { TokenDrawn } from "@prisma/client"

interface WeekTokensProps {
  data: Pick<TokenDrawn, "id" | "name" | "symbol" | "priceAtDrawn">[]
}

export function WeekTokenDrawn({ data }: WeekTokensProps) {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.symbol} className="flex items-center">
          <TokenIcon symbol={item.symbol} />
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.symbol}</p>
          </div>
          <div className="ml-auto">
            <p className="font-medium leading-none">
              ${item.priceAtDrawn.toFixed(4)}
            </p>
            <p className="text-muted-foreground">Bought at</p>
          </div>
        </div>
      ))}
    </div>
  )
}
