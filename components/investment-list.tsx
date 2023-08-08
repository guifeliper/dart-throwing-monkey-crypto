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
    <Tabs defaultValue="investments" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="investments">Invesments</TabsTrigger>
        <TabsTrigger value="pies">Pies</TabsTrigger>
      </TabsList>
      <TabsContent value="investments">
        <Card>
          <CardHeader>
            <CardTitle>Investments</CardTitle>
            <CardDescription>
              Select an investment to view more details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {new Array(5).fill(null).map((_, i) => (
              <InvestmentListItem />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="pies">
        <Card>
          <CardHeader>
            <CardTitle>Pies</CardTitle>
            <CardDescription>
              Select an pie to view more details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {new Array(5).fill(null).map((_, i) => (
              <InvestmentListItem />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
