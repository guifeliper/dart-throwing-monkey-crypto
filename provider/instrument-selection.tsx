"use client"
import { Pie } from "@/types"
import React, { createContext, useState } from "react"

type DialogType = "new" | "edit"

type InstrumentSelectionContextType = {
  selectedInstrument: Pie | null
  setSelectedInstrument: React.Dispatch<React.SetStateAction<Pie | null>>
  dialogOpen: boolean
  setDialogOpen: (isOpen: boolean, type?: DialogType) => void
  dialogType: DialogType
}

export const InstrumentSelectionContext =
  createContext<InstrumentSelectionContextType>({
    selectedInstrument: null,
    setSelectedInstrument: () => {},
    dialogOpen: false,
    setDialogOpen: () => {},
    dialogType: "new",
  })

type InstrumentSelectionProviderProps = {
  children: React.ReactNode
}

export const InstrumentSelectionProvider = ({
  children,
}: InstrumentSelectionProviderProps) => {
  const [selectedInstrument, setSelectedInstrument] = useState<Pie | null>(null)
  const [dialogOpen, setDialogOpenOrClose] = useState(false)
  const [dialogType, setDialogType] = useState<DialogType>("new")

  const setDialogOpen = (isOpen: boolean, type?: DialogType) => {
    setDialogType(type ?? "new")
    setDialogOpenOrClose(isOpen)
  }

  return (
    <InstrumentSelectionContext.Provider
      value={{
        selectedInstrument,
        setSelectedInstrument,
        dialogOpen,
        setDialogOpen,
        dialogType,
      }}
    >
      {children}
    </InstrumentSelectionContext.Provider>
  )
}
