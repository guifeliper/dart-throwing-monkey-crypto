import { InvestmentListItem } from "@/components/investment-list-item"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AddSlicesToPie } from "./add-slices-to-pie"

export const PieList = ({ pies }) => {
  return (
    <>
      {/* <InvestmentListItemSkeleton /> */}
      {pies.length === 0 && (
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            You don&apos;t have any pies yet. Create a pie to get started.
          </p>
        </div>
      )}
      {pies.map((investment) => (
        <InvestmentListItem key={investment.asset} data={investment} />
      ))}
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger>
            <Button className="bg-blue-600/75 text-white hover:bg-blue-600/30">
              Create a Pie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AddSlicesToPie />
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}