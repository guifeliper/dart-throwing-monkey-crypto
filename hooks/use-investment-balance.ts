import { InvestmentBalanceData } from "@/types"
import * as React from "react"

export function useInvestmentBalance(): InvestmentBalanceData {
  const [balance, setBalance] = React.useState<InvestmentBalanceData>({
    totalBalanceFIAT: 0,
    data: [],
  })
  React.useEffect(() => {
    console.log("hello world")
    const fetchBalance = async () => {
      const response = await fetch("/api/users/balance")
      const data = (await response.json()) as InvestmentBalanceData
      setBalance(data)
    }
    fetchBalance()
  }, [])

  return balance
}
