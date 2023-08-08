import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function InvestmentListItem() {
  return (
    <div className="flex cursor-pointer items-center rounded-md p-2 hover:bg-muted">
      <Avatar className="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">Olivia Martin</p>
        <p className="text-sm text-muted-foreground">olivia.</p>
      </div>
      <div className="ml-auto space-y-1">
        <p className="text-sm font-medium leading-none">+$1.999,00</p>
        <p className="text-sm text-muted-foreground">€39.98(2%)</p>
      </div>
    </div>
  )
}
