"use client"
import { Pie } from "@/types"
import React, { createContext, useState } from "react"

type InstrumentSelectionContextType = {
  selectedInstrument: Pie | null
  setSelectedInstrument: React.Dispatch<React.SetStateAction<Pie | null>>
}

export const InstrumentSelectionContext =
  createContext<InstrumentSelectionContextType>({
    selectedInstrument: null,
    setSelectedInstrument: () => {},
  })

type InstrumentSelectionProviderProps = {
  children: React.ReactNode
}

export const InstrumentSelectionProvider = ({
  children,
}: InstrumentSelectionProviderProps) => {
  const [selectedInstrument, setSelectedInstrument] = useState<Pie | null>(null)

  return (
    <InstrumentSelectionContext.Provider
      value={{ selectedInstrument, setSelectedInstrument }}
    >
      {children}
    </InstrumentSelectionContext.Provider>
  )
}
