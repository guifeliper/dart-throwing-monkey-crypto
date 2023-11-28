"use client"

import { HoldingsTable } from "@/components/holdings-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useInstrumentSelection } from "@/hooks/use-instrument-selection"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { buttonVariants } from "./ui/button"
import { toast } from "./ui/use-toast"
export const Holdings = () => {
  const { selectedInstrument, setDialogOpen } = useInstrumentSelection()
  const t = useTranslations("Dashboard")

  function mapSelectedInstrumentToAssets(
    selectedInstrument: any
  ): { asset: string; weight: number }[] {
    return (
      selectedInstrument?.slices?.map((asset: any) => ({
        asset: asset.asset,
        weight: asset.target,
      })) || []
    )
  }

  const handleRebalance = async () => {
    const data = mapSelectedInstrumentToAssets(selectedInstrument)
    const response = await fetch("/api/users/rebalance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      console.log("Rebalance successful")
      toast({
        title: "Rebalance successful",
        description: "Your portfolio has been rebalanced.",
      })
    } else {
      console.log("Rebalance failed")
      toast({
        title: "Rebalance failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }

    // window.location.href = "/dashboard"
  }
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
            {t("edit-me")}
          </button>
          <button
            className={cn(buttonVariants({ variant: "outline" }), "uppercase")}
            onClick={handleRebalance}
          >
            {t("rebalance")}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <HoldingsTable />
      </CardContent>
    </Card>
  )
}
