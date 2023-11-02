import { InstrumentSelectionContext } from "@/provider/instrument-selection"
import { useContext } from "react"

export function useInstrumentSelection() {
  return useContext(InstrumentSelectionContext)
}
