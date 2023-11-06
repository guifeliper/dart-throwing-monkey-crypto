"use client"
import { Pie } from "@/types"
import React, { createContext, useState } from "react"

type DialogType = "new" | "edit"

type InstrumentSelectionContextType = {
  selectedInstrument: Pie | null
  setSelectedInstrument: React.Dispatch<React.SetStateAction<Pie | null>>
  dialogOpen: boolean
  setDialogOpen: (isOpen: boolean, type?: DialogType) => void
}

export const InstrumentSelectionContext =
  createContext<InstrumentSelectionContextType>({
    selectedInstrument: null,
    setSelectedInstrument: () => {},
    dialogOpen: false,
    setDialogOpen: () => {},
  })

type InstrumentSelectionProviderProps = {
  children: React.ReactNode
}

export const InstrumentSelectionProvider = ({
  children,
}: InstrumentSelectionProviderProps) => {
  const [selectedInstrument, setSelectedInstrument] = useState<Pie | null>(null)
  const [dialogOpen, setDialogOpenOrClose] = useState(false)
  const [_, setDialog] = useState<DialogType>("new")

  const setDialogOpen = (isOpen: boolean, type?: DialogType) => {
    setDialogOpenOrClose(isOpen)
    setDialog(type ?? "new")
  }

  return (
    <InstrumentSelectionContext.Provider
      value={{
        selectedInstrument,
        setSelectedInstrument,
        dialogOpen,
        setDialogOpen,
      }}
    >
      {children}
    </InstrumentSelectionContext.Provider>
  )
}
