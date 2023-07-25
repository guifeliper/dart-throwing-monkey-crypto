import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { useTranslations } from "next-intl"

export default function DashboardLoading() {
  const t = useTranslations("Dashboard")

  return (
    <DashboardShell>
      <DashboardHeader
        heading={t("portfolio")}
        text={t("manage-portfolio")}
      ></DashboardHeader>
    </DashboardShell>
  )
}
