"use client"

import { HoldingsTable } from "@/components/holdings-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useInstrumentSelection } from "@/hooks/use-instrument-selection"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"
export const Holdings = () => {
  const { selectedInstrument, setDialogOpen } = useInstrumentSelection()
  return (
    <Card>
      <CardHeader className="grid grid-cols-4">
        <CardTitle className="col-span-3 grow text-3xl leading-10">
          {selectedInstrument?.name}
        </CardTitle>
        <div className="grid grid-cols-2 gap-2">
          <button
            className={cn(buttonVariants(), "uppercase ")}
            onClick={() => setDialogOpen(true, "edit")}
          >
            Edit me
          </button>
          <button
            className={cn(buttonVariants({ variant: "outline" }), "uppercase")}
          >
            Rebalance
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <HoldingsTable />
      </CardContent>
    </Card>
  )
}
