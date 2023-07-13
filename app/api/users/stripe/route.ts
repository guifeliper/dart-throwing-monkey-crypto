import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { createCheckoutLink } from "@/lib/create-checkout-link"
import { getLemonSqueezyClient } from "@/lib/lemon-squeezy"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { RetrieveSubscriptionResult } from "@/types/lemon-squeezy"
import { getServerSession } from "next-auth"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id)
    const lemonSqueezyClient = getLemonSqueezyClient()
    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
      const path = `v1/subscriptions/${subscriptionPlan.stripeSubscriptionId}`
      const subscriptionResult =
        await lemonSqueezyClient.request<RetrieveSubscriptionResult>({
          path,
          method: "GET",
        })
      return new Response(
        JSON.stringify({
          url: subscriptionResult.data.attributes.urls.update_payment_method,
        })
      )
    }

    // // The user is on the free plan.
    // // Create a checkout session to upgrade.
    const lemonSqueezySession = await createCheckoutLink({
      user: session?.user,
    })

    return new Response(
      JSON.stringify({
        url: lemonSqueezySession,
      })
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
