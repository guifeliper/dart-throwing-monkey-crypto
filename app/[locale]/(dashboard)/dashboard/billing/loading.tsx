import { CardSkeleton } from "@/components/card-skeleton"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { useTranslations } from "next-intl"

export default function DashboardBillingLoading() {
  const t = useTranslations("Dashboard-Billing")

  return (
    <DashboardShell>
      <DashboardHeader heading={t("billing")} text={t("manage-billing")} />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
