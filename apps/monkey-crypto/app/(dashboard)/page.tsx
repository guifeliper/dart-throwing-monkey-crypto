import { WeekTokens } from "@/components/weekTokens";
import prisma from "@/lib/prisma";
import getYearWeekString from "@/utils/getYearWeekString";

export const metadata = {
  title: "Dashboard",
};

export default async function Home() {
  const getCurrentWeek = getYearWeekString();
  const weekTokens = await prisma.tokenDrawn.findMany({
    where: {
      category: "100",
      timeframe: getCurrentWeek,
    },
  });

  return (
    <div className="grid grid-cols-3 gap-0">
      <div className="col-span-2 p-4 bg-gray-200 dark:bg-gray-800">
        Column 1
      </div>
      <div className="p-4 bg-gray-300 dark:bg-gray-500">
        <WeekTokens data={weekTokens} />
      </div>
    </div>
  );
}
