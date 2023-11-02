import { Pie } from "@/types"
import * as React from "react"

interface usePiesBalanceProps {
  loading: boolean
  pies: Pie[]
}
export function usePiesBalance(): usePiesBalanceProps {
  const [pies, setPies] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true)
      const response = await fetch("/api/users/pies")
      const data = await response.json()
      setPies(data)
      setLoading(false)
    }
    fetchBalance()
  }, [])

  return { loading, pies }
}
