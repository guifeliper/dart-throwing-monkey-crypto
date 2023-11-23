import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useInstrumentSelection } from "@/hooks/use-instrument-selection"
import { cn } from "@/lib/utils"
import { AssetBalance, Pie } from "@/types"
import { VariantProps, cva } from "class-variance-authority"
import React from "react"

const wrapperVariants = cva(
  "flex cursor-pointer items-center rounded-md p-2 hover:bg-muted",
  {
    variants: {
      selected: {
        true: "bg-muted",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

interface InvestmentListItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapperVariants> {
  data: AssetBalance | Pie
}

export function InvestmentListItem({
  selected,
  data,
}: InvestmentListItemProps) {
  const { setSelectedInstrument } = useInstrumentSelection()

  const handleClick = () => {
    if ("asset" in data) return
    console.log(data)
    setSelectedInstrument(data)
  }
  return (
    <div className={cn(wrapperVariants({ selected }))} onClick={handleClick}>
      <Avatar className="h-9 w-9">
        <AvatarImage src="" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">
          {"asset" in data ? data.asset : data.name}
        </p>
        <p className="text-sm text-muted-foreground">
          {"pair" in data ? data.pair : null}
        </p>
      </div>
      <div className="ml-auto space-y-1">
        <p className="text-right text-sm font-medium leading-none">
          {"totalFIAT" in data
            ? data?.totalFIAT?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : null}
        </p>
        <p className="text-right text-sm text-muted-foreground">
          {"quantity" in data
            ? data?.quantity?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : null}
        </p>
      </div>
    </div>
  )
}

export const InvestmentListItemSkeleton = ({ length = 12 }) => {
  return Array.from({ length: length }).map((_, i) => (
    <Skeleton key={i} className="h-10 w-full" />
  ))
}
