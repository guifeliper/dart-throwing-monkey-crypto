/* eslint-disable turbo/no-undeclared-env-vars */
import calculateInvestment, {
  GroupPercentageData,
} from "@/utils/calculateInvestment";
import { PrismaClient } from "@prisma/client";

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
    async accumulativeInvestment() {
      const percentageByGroup: GroupPercentageData[] =
        await prisma.$queryRaw`SELECT   category,   timeframe,   AVG((priceAtContest - priceAtDrawn) / priceAtDrawn * 100) AS percentage_difference FROM   TokenDrawn WHERE priceAtContest <> 0 GROUP BY   category,   timeframe;`;

      return calculateInvestment(percentageByGroup);
    },
  });
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
