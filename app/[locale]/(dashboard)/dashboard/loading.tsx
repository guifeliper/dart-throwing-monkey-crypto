import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Portfolio"
        text="Manage your own Portfolio"
      ></DashboardHeader>
    </DashboardShell>
  )
}
