"use client"

import * as React from "react"

import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { cn, formatDate } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { UserSubscriptionPlan } from "types"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean
  }
}

export function BillingForm({
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps) {
  const t = useTranslations("Dashboard-Billing")
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isCancelLoading, setCancelIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(!isLoading)

    // Get a Stripe session URL.
    const response = await fetch("/api/users/stripe")

    if (!response?.ok) {
      setIsLoading(false)
      return toast({
        title: "Something went wrong.",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      })
    }

    // Redirect to the Stripe session.
    // This could be a checkout page for initial upgrade.
    // Or portal to manage existing subscription.
    const session = await response.json()
    if (session) {
      window.location.href = session.url
    }
  }

  async function onCancel(event) {
    event.preventDefault()
    setCancelIsLoading(!isCancelLoading)

    // Get a Stripe session URL.
    const response = await fetch("/api/users/subscription/cancel")

    if (!response?.ok) {
      setIsLoading(false)
      return toast({
        title: "Something went wrong.",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      })
    }

    const session = await response.json()
    if (session) {
      window.location.href = session.url
    }
  }

  function getDescription() {
    let message = ""
    if (subscriptionPlan.name === "Free") {
      message = t("free-plan")
    }
    if (subscriptionPlan.name == "Basic") {
      message = t("basic-plan")
    }
    if (subscriptionPlan.name == "Pro") {
      message = t("pro-plan")
    }
    return message
  }

  return (
    <form
      className={cn(className)}
      onSubmit={onSubmit}
      onReset={onCancel}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t("subscription-title")}</CardTitle>
          <CardDescription>
            {t("subscription-title", {
              subscriptionPlan: subscriptionPlan.name,
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>{getDescription()}</CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
          <div className="flex justify-between space-x-2">
            <button
              type="submit"
              className={cn(buttonVariants())}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {subscriptionPlan.isPro
                ? `${t("manage-subscription")}`
                : `${t("upgrade-subscription")}`}
            </button>
            {subscriptionPlan.isPro && (
              <button
                type="reset"
                className={cn(buttonVariants({ variant: "destructive" }))}
                disabled={isCancelLoading || subscriptionPlan.isCanceled}
              >
                {isCancelLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("cancel-subscription")}
              </button>
            )}
          </div>
          {subscriptionPlan.isPro ? (
            <p className="rounded-full text-xs font-medium">
              {subscriptionPlan.isCanceled
                ? `${t("canceled-date")}`
                : `${t("renew-date")}`}
              {formatDate(subscriptionPlan.stripeCurrentPeriodEnd)}.
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  )
}
