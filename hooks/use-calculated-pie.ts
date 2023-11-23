import { Pie, SlicePie } from "@/types"
import { useEffect, useState } from "react"

const useCalculatedPie = (pies: Pie[], data: any[]) => {
  const [newPie, setNewPie] = useState<Pie[]>(pies)

  const calculatePercentage = (slices: SlicePie[]) => {
    const totalValue = slices.reduce(
      (sum, slice) => sum + (isNaN(slice.value) ? 0 : slice.value),
      0
    )
    return slices.map((slice) => ({
      ...slice,
      current: isNaN(slice.value) ? 0 : (slice.value / totalValue) * 100,
    }))
  }

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
    setNewPie(mergedPies)
  }, [pies, data])

  return newPie
}

export default useCalculatedPie
