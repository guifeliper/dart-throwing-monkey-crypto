import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvestmentListItem } from "./investment-list-item"

export function InvestmentList() {
  return (
    <Tabs defaultValue="pies" className="h-full w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pies">Pies</TabsTrigger>
        <TabsTrigger value="investments">Invesments</TabsTrigger>
      </TabsList>
      <TabsContent value="pies">
        <Card>
          <CardHeader>
            <CardTitle>Pies</CardTitle>
            <CardDescription>
              Select an pie to view more details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {new Array(8).fill(null).map((_, i) => (
              <InvestmentListItem selected={i == 0} />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="investments">
        <Card>
          <CardHeader>
            <CardTitle>Investments</CardTitle>
            <CardDescription>
              Select an investment to view more details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {new Array(8).fill(null).map((_, i) => (
              <InvestmentListItem />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
