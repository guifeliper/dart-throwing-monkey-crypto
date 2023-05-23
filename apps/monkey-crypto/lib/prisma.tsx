/* eslint-disable turbo/no-undeclared-env-vars */
import { PrismaClient, TokenDrawn } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

export function TokenDrawns(prismaTokens: PrismaClient["tokenDrawn"]) {
  return Object.assign(prismaTokens, {
    /**
     * Signup the first user and create a new team of one. Return the User with
     * a full name and without a password
     */
    async calculateInvestment() {
      const percentageByGroup =
        await prisma.$queryRaw`SELECT   category,   timeframe,   AVG((priceAtContest - priceAtDrawn) / priceAtDrawn * 100) AS percentage_difference FROM   TokenDrawn WHERE createdAt <> lastModified GROUP BY   category,   timeframe;`;
      function calculateInvestment(data: any[]) {
        let investment = 10000;

        return data.map((item) => {
          investment *= 1 + item.percentage_difference / 100;
          return {
            ...item,
            investment: investment.toFixed(2),
          };
        });
      }
      console.log(calculateInvestment(percentageByGroup as any[]));
      return calculateInvestment(percentageByGroup as any[]);
    },
  });
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
