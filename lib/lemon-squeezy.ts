import { env } from "@/env.mjs"
import { LemonsqueezyClient } from "lemonsqueezy.ts"

export const lemonsqueezy = new LemonsqueezyClient(env.LEMON_SQUEEZY_API_KEY)
