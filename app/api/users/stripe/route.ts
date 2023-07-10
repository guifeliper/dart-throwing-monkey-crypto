import { z } from "zod"

import { env } from "@/env.mjs"
import { authOptions } from "@/lib/auth"
import { createCheckoutLink } from "@/lib/create-checkout-link"
import { absoluteUrl } from "@/lib/utils"
import { getServerSession } from "next-auth"

const billingUrl = absoluteUrl("/dashboard/billing")

export async function GET(req: Request) {
  try {
    console.log("I have been called")
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(null, { status: 403 })
    }

    //const subscriptionPlan = await getUserSubscriptionPlan(session.user.id)

    // const checkoutOptions = {
    //   custom_price: 3,
    //   store: "harv",
    //   variant: "98599",
    // }
    // const newCheckout = await lemonsqueezy.createCheckout(checkoutOptions)

    // console.log(newCheckout)
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
    const lemonSqueezySession = createCheckoutLink({
      variantId: env.LEMON_SQUEEZY_BASIC_MONTHLY_PLAN_ID,
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
