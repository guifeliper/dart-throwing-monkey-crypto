import { Holdings } from "@/components/holdings"
import { InvestmentList } from "@/components/investment-list"
import { InvestmentSummary } from "@/components/investment-summary"
import { useTranslations } from "next-intl"
import { Fragment } from "react"

export const metadata = {
  title: "Dashboard",
}

export default function DashboardPage() {
  const t = useTranslations("Dashboard")

  return (
    <Fragment>
      <div className="grid gap-4">
        <InvestmentSummary />
        <InvestmentList />
      </div>
      <div className="grid gap-4">
        <Holdings />
      </div>
    </Fragment>
  )
}
