"use client"

import { useInvestmentBalance } from "@/hooks/use-investment-balance"
import { InvestmentList } from "./investment-list"
import { InvestmentSummary } from "./investment-summary"

export const InvestmentSideBar = () => {
  const { totalBalanceFIAT, data, loading } = useInvestmentBalance()

  return (
    <div className="grid-rows-8 grid gap-4">
      <div className="col-span-2 row-span-1">
        <InvestmentSummary value={totalBalanceFIAT} />
      </div>
      <div className="row-span-7 col-span-2 h-full">
        <InvestmentList investments={data} />
      </div>
    </div>
  )
}
