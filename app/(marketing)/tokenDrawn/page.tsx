// import { WeekTokens } from "@/components/weekTokens"
// import prisma, { TokenDrawns } from "@/lib/prisma"
// import getYearWeekString from "@/utils/getYearWeekString"
// import { LineChart } from "@/components/line-chart"
// export const metadata = {
//   title: "Dashboard",
// }

// export const revalidate = 86400 // 1 day
// export default async function Home() {
//   const tokenDrawn = TokenDrawns(prisma.tokenDrawn)
//   const getCurrentWeek = getYearWeekString()
//   const weekTokens = await tokenDrawn.findMany({
//     where: {
//       category: "Top-100",
//       timeframe: getCurrentWeek,
//     },
//   })

//   const accumulativeInvestment = await tokenDrawn.accumulativeInvestment()

//   return (
//     <div className="grid grid-cols-3 gap-0">
//       <div className="col-span-3 bg-gray-200 p-4 dark:bg-gray-800 lg:col-span-2">
//         <LineChart data={accumulativeInvestment} />
//       </div>
//       <div className="col-span-3 bg-gray-300 p-4 dark:bg-gray-500 lg:col-span-1">
//         <WeekTokens data={weekTokens} />
//       </div>
//     </div>
//   )
// }
import { Metadata } from "next"
import { Coins, DollarSign, TrendingDown, TrendingUp } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { TokenDrawnChart } from "@/components/token-drawn-chart"

export const metadata: Metadata = {
  title: "Token Drawn",
  description:
    "This page shows the current evolution of the Dart Throwing Monkey on Crypto Currency. See the current selected list and navigate between the old ones.",
}

export default function DashboardPage() {
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
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Current Balance
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Best Performer
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Worst Performer
                    </CardTitle>
                    <TrendingDown className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">-12,234</div>
                    <p className="text-xs text-muted-foreground">
                      -19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      All-time profit
                    </CardTitle>
                    <Coins className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +11 since last week
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <TokenDrawnChart />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Current Tokens</CardTitle>
                    <CardDescription>
                      Selected tokens for this week.
                    </CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
