import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { getLemonSqueezyClient } from "@/lib/lemon-squeezy"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { getServerSession } from "next-auth"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

    const subscriptionPlan = await getUserSubscriptionPlan(session.user.id)
    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
      const lemonSqueezyClient = getLemonSqueezyClient()
      const path = `v1/subscriptions/${subscriptionPlan.stripeSubscriptionId}`
      await lemonSqueezyClient.request({
        path,
        method: "DELETE",
      })

      return new Response(
        JSON.stringify({
          url: "/dashboard/billing",
        })
      )
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
