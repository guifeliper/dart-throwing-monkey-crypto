import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export const InvestmentSummary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">€9,325</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center">
          <div className="mr-6">
            <h3 className="text-xs font-semibold uppercase leading-5 text-gray-600">
              Invested
            </h3>
            <p className="text-base font-semibold leading-7 text-gray-800 dark:text-gray-300">
              €9,171.54
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase leading-5 text-gray-600">
              Return
            </h3>
            <p className="text-base font-semibold leading-7 text-green-500">
              +€164.69 (1.80%)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
