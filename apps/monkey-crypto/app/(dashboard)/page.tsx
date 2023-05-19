import { WeekTokens } from "@/components/weekTokens";
export const metadata = {
  title: "Dashboard",
};
export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-0">
      <div className="col-span-2 p-4 bg-gray-200 dark:bg-gray-800">
        Column 1
      </div>
      <div className="p-4 bg-gray-300 dark:bg-gray-500">
        <WeekTokens />
      </div>
    </div>
  );
}
