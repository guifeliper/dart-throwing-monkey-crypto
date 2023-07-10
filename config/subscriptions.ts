import { env } from "@/env.mjs"
import { SubscriptionPlan } from "types"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 3 investiment pie. Upgrade to the Basic plan for unlimited auto investing pie.",
  stripePriceId: "",
}

export const BasicPlan: SubscriptionPlan = {
  name: "Basic",
  description: "The Basic plan has unlimited investment pies.",
  stripePriceId: env.LEMON_SQUEEZY_BASIC_MONTHLY_PLAN_ID || "",
}

export const proPlan: SubscriptionPlan = {
  name: "Professional",
  description:
    "The Professional plan has unlimited posts and Telegram management pies.",
  stripePriceId: env.LEMON_SQUEEZY_PRO_MONTHLY_PLAN_ID || "",
}
