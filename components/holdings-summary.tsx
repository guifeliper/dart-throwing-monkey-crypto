import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export const HoldingsSummary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="grow text-3xl leading-10">Pension</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 p-5">
          <div className="mx-6 my-16 shrink-0">grafico</div>
          <div className="flex flex-col items-center">
            <div className="uppercase">Holdings value</div>
            <p className="text-2xl font-bold leading-7 text-gray-800 dark:text-gray-300">
              €9,171.54
            </p>
            <p className="text-base font-semibold leading-7 text-gray-800 dark:text-gray-300">
              -€63.33 (3.30%)
            </p>
            <div className="mt-2 flex items-center gap-2">
              <button type="submit" className={cn(buttonVariants())}>
                Edit me
              </button>
              <button
                type="submit"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Rebalance
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
