import { PercentageByGroup, TokenDrawnPerformance } from "@/types/tokenDrawn"
import calculateInvestment, {
  GroupPercentageData,
} from "@/utils/calculateInvestment"
import { PrismaClient, TokenDrawn } from "@prisma/client"

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

export function TokenDrawns(prismaTokens: PrismaClient["tokenDrawn"]) {
  return Object.assign(prismaTokens, {
    /**
     * Signup the first user and create a new team of one. Return the User with
     * a full name and without a password
     */

    async accumulativeInvestment() {
      const percentageByGroup: GroupPercentageData[] =
        await prisma.$queryRaw`SELECT   category,   timeframe,   AVG((priceAtContest - priceAtDrawn) / priceAtDrawn * 100) AS percentage_difference FROM   TokenDrawn WHERE priceAtContest <> 0 GROUP BY   category,   timeframe;`

      return calculateInvestment(percentageByGroup)
    },
    async currentBalance() {
      const initialValue = 10000
      const percentages: GroupPercentageData[] =
        await prisma.$queryRaw`SELECT   category,   timeframe,   AVG((priceAtContest - priceAtDrawn) / priceAtDrawn * 100) AS percentage_difference FROM   TokenDrawn WHERE priceAtContest <> 0 and category = 'Top-100' GROUP BY   category,   timeframe;`

      const result = percentages.reduce((accumulator, item) => {
        return accumulator * (1 + (item.percentage_difference / 100))
      }, initialValue)
      return result
    },
    async worstPerformance() {
      const result: TokenDrawnPerformance<number>[] =
        await prisma.$queryRaw`SELECT 
          name, symbol, timeframe, (priceAtContest - priceAtDrawn) / priceAtDrawn * 100 AS percentage_difference 
          FROM TokenDrawn 
          WHERE 
            priceAtContest <> 0 AND
            category = 'Top-100'
          ORDER BY percentage_difference
          LIMIT 1;`
      return result[0]
    },
    async bestPerformance() {
      const result: TokenDrawnPerformance<number>[] =
        await prisma.$queryRaw`SELECT 
          name, symbol, timeframe, (priceAtContest - priceAtDrawn) / priceAtDrawn * 100 AS percentage_difference 
          FROM TokenDrawn 
          WHERE 
            priceAtContest <> 0 AND
            category = 'Top-100'
          ORDER BY percentage_difference DESC
          LIMIT 1;`
      return result[0]
    },
    async percentageByGroup(): Promise<PercentageByGroup<string>[]> {
      const percentageByGroup: PercentageByGroup<number>[] =
        await prisma.$queryRaw`
        SELECT
          t.timeframe,
          AVG(CASE WHEN t.category = 'Top-100' THEN (t.priceAtContest - t.priceAtDrawn) / t.priceAtDrawn * 100 END) AS monkey,
          AVG(CASE WHEN t.category = 'BTC-benchmark' THEN (t.priceAtContest - t.priceAtDrawn) / t.priceAtDrawn * 100 END) AS bitcoin
        FROM
          TokenDrawn t
        WHERE
          t.priceAtContest <> 0
        GROUP BY
          t.timeframe;
        `

      return percentageByGroup.map((item) => ({
        ...item,
        monkey: item.monkey.toFixed(2),
        bitcoin: item.bitcoin.toFixed(2),
      }))
    },
  })
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
