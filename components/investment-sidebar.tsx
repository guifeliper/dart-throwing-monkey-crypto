"use client"

import { useInvestmentBalance } from "@/hooks/use-investment-balance"
import { usePiesBalance } from "@/hooks/use-pies-balance"
import { Pie, SlicePie } from "@/types"
import { useEffect, useState } from "react"
import { InvestmentList } from "./investment-list"
import { InvestmentSummary } from "./investment-summary"

export const InvestmentSideBar = () => {
  const { totalBalanceFIAT, data } = useInvestmentBalance()
  const { pies } = usePiesBalance()
  const [newPie, setNewPie] = useState<Pie[]>(pies)

  const calculatePercentage = (slices: SlicePie[]) => {
    debugger
    const totalValue = slices.reduce(
      (sum, slice) => sum + (isNaN(slice.value) ? 0 : slice.value),
      0
    )
    return slices.map((slice) => ({
      ...slice,
      current: (isNaN(slice.value) ? 0 : slice.value / totalValue) * 100,
    }))
  }

  // ...

  useEffect(() => {
    const mergedPies: Pie[] = pies.map((pie) => {
      const updatedSlices = pie.slices.map((slice) => {
        const matchingInvestment = data.find(
          (investment) => investment.asset === slice.asset
        )
        if (matchingInvestment) {
          return {
            ...slice,
            quantity: matchingInvestment.quantity,
            value: matchingInvestment.totalFIAT,
          }
        }
        return slice
      })
      const slicesWithPercentage = calculatePercentage(updatedSlices)
      return {
        ...pie,
        slices: slicesWithPercentage,
      }
    })

    console.log({ mergedPies, data })
    setNewPie(mergedPies)
  }, [pies, data, totalBalanceFIAT])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-none ">
        <InvestmentSummary value={totalBalanceFIAT} />
      </div>
      <div className="flex-auto">
        <InvestmentList investments={data} pies={newPie} />
      </div>
    </div>
  )
}
