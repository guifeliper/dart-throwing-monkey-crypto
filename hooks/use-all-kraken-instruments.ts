import { useEffect, useState } from "react"

export const useAllKrakenInstruments = <T>(): {
  data: T[] | undefined
  error: Error | undefined
  loading: boolean
} => {
  const [data, setData] = useState<T[]>()
  const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/kraken/allInstruments")

        if (!response.ok) {
          throw new Error(
            `Request failed with status code ${response.status}: ${response.statusText}`
          )
        }

        const responseData = await response.json()

        if (Array.isArray(responseData.assets)) {
          setData(responseData.assets)
        } else {
          throw new Error("Invalid response data")
        }
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, error, loading }
}
