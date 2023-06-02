import { dashboardConfig } from "@/config/dashboard";
import { MainNav } from "@/components/main-nav";
import { DashboardNav } from "@/components/nav";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex items-center justify-between h-16 py-4">
          <MainNav items={dashboardConfig.mainNav} />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex flex-col flex-1 w-full overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
