import { HoldingsSummary } from "@/components/holdings-summary"
import { InvestmentList } from "@/components/investment-list"
import { InvestmentSummary } from "@/components/investment-summary"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
        <HoldingsSummary />
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </Fragment>
  )
}
