import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { createCheckoutLink } from "@/lib/create-checkout-link"
import { getServerSession } from "next-auth"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

    //const subscriptionPlan = await getUserSubscriptionPlan(session.user.id)

    // // // The user is on the pro plan.
    // // // Create a portal session to manage subscription.
    // // if (subscriptionPlan.isPro && subscriptionPlan.stripeCustomerId) {
    // //   const stripeSession = await stripe.billingPortal.sessions.create({
    // //     customer: subscriptionPlan.stripeCustomerId,
    // //     return_url: billingUrl,
    // //   })

    // //   return new Response(JSON.stringify({ url: stripeSession.url }))
    // // }

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
