import { redirect } from "next/navigation"

import { BillingForm } from "@/components/billing-form"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { siteConfig } from "@/config/site"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { getTranslator } from "next-intl/server"

export const metadata = {
  title: "Billing",
  description: "Manage billing and your subscription plan.",
}
interface BillingPageProps {
  params: {
    locale: string
  }
}
export default async function BillingPage({ params }: BillingPageProps) {
  const user = await getCurrentUser()
  const t = await getTranslator(params.locale ?? "en", "Dashboard-Billing")

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user?.id)
  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    isCanceled = subscriptionPlan.stripeCancelled
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={t("billing")} text={t("manage-billing")} />
      <div className="grid gap-8">
        <Alert className="!pl-14">
          <Icons.warning />
          <AlertTitle>{t("alert-title")}</AlertTitle>
          <AlertDescription>
            {t("alert-description", { name: siteConfig.name })}
            <a
              href="https://stripe.com/docs/testing#cards"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-8"
            >
              {t("payment-docs")}
            </a>
            .
          </AlertDescription>
        </Alert>
        <BillingForm
          subscriptionPlan={{
            ...subscriptionPlan,
            isCanceled,
          }}
        />
      </div>
    </DashboardShell>
  )
}
