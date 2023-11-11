import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useInstrumentSelection } from "@/hooks/use-instrument-selection"
import { useEffect } from "react"
import { InvestmentListItem } from "../investment-list-item"
import StepperStates from "./stepper-states"

export const PieList = ({ pies }) => {
  const { dialogOpen, setDialogOpen, setSelectedInstrument } =
    useInstrumentSelection()

  useEffect(() => {
    if (pies.length > 0) {
      setSelectedInstrument(pies[0])
    }
  }, [pies, setSelectedInstrument])

  return (
    <>
      {pies.length === 0 && (
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            You don&apos;t have any pies yet. Create a pie to get started.
          </p>
        </div>
      )}
      {pies?.map((pie) => <InvestmentListItem key={pie.id} data={pie} />)}
      <div className="flex justify-center">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600/75 text-white hover:bg-blue-600/30">
              Create a Pie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <StepperStates />
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
