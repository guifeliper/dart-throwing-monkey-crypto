import { Coins, DollarSign, TrendingDown, TrendingUp } from "lucide-react"
import { Metadata } from "next"

import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { TokenDrawnChart } from "@/components/token-drawn-chart"
import TokenIcon from "@/components/token-icon"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WeekTokenDrawn } from "@/components/week-token-drawn"
import { TokenDrawns, db } from "@/lib/db"
import getYearWeekString from "@/utils/getYearWeekString"
import { getTranslator } from "next-intl/server"

export const metadata: Metadata = {
  title: "Token Drawn",
  description:
    "This page shows the current evolution of the Dart Throwing Monkey on Crypto Currency. See the current selected list and navigate between the old ones.",
}

export const revalidate = 86400 // 1 day

export default async function DashboardPage({ params }) {
  const t = await getTranslator(params.locale ?? "en", "TokenDrawn")
  const tokenDrawn = TokenDrawns(db.tokenDrawn)
  const getCurrentWeek = getYearWeekString()
  const currentTokens = await tokenDrawn.findMany({
    where: {
      category: "Top-100",
      timeframe: getCurrentWeek,
    },
  })

  const currentBalance = await tokenDrawn.currentBalance()
  const allTimeProfit = currentBalance - 10000
  const byGroupData = await tokenDrawn.percentageByGroup()
  const worstPerformance = await tokenDrawn.worstPerformance()
  const bestPerformance = await tokenDrawn.bestPerformance()

  return (
    <div className="container py-6 lg:py-10">
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Token Drawn</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t("current-balance")}
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      $
                      {currentBalance.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground"></p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t("best-performer")}
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="mr-auto">
                        <p className="text-2xl font-bold">
                          {bestPerformance?.percentage_difference.toFixed(2)}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          at {bestPerformance?.timeframe}
                        </p>
                      </div>
                      <TokenIcon symbol={bestPerformance.symbol} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t("worst-performer")}
                    </CardTitle>
                    <TrendingDown className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="mr-auto">
                        <p className="text-2xl font-bold">
                          {worstPerformance?.percentage_difference.toFixed(2)}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          at {worstPerformance?.timeframe}
                        </p>
                      </div>
                      <TokenIcon symbol={worstPerformance.symbol} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {t("all-time-profit")}
                    </CardTitle>
                    <Coins className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      $
                      {allTimeProfit.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground"></p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-5">
                  <CardHeader>
                    <CardTitle>{t("overview")}</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <TokenDrawnChart data={byGroupData} />
                  </CardContent>
                </Card>
                <Card className="md:col-span-5 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>{t("current-tokens")}</CardTitle>
                    <CardDescription>
                      {t("selected-week-tokens")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WeekTokenDrawn data={currentTokens} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
