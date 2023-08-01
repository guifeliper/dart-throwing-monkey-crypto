import { DashboardHeader } from "@/components/header"
import { useTranslations } from "next-intl"

export const metadata = {
  title: "Dashboard",
}

export default function DashboardPage() {
  const t = useTranslations("Dashboard")

  return (
    <div>
      <DashboardHeader
        heading={t("portfolio")}
        text={t("manage-portfolio")}
      ></DashboardHeader>
    </div>
  )
}
