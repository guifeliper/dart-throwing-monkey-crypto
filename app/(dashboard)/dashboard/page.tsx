import { DashboardHeader } from "@/components/header"
import { getCurrentUser } from "@/lib/session"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  return (
    <div>
      <DashboardHeader
        heading="Portfolio"
        text="Manage your own Portfolio"
      ></DashboardHeader>
    </div>
  )
}
