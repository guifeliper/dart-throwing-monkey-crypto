import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
  ],
  sidebarNav: [
    {
      title: "Portfolio",
      href: "/dashboard",
      icon: "pieChart",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
  ],
}
