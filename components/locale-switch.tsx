"use client"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next-intl/client"
import { useTransition } from "react"

export function LocaleSwitch() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const locale = useLocale()
  const pathname = usePathname()

  function handleChange(locale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: locale })
    })
  }
  return (
    <Select
      defaultValue={locale}
      onValueChange={handleChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="pt">Português</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
