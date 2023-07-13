import { env } from "@/env.mjs"
import { LemonsqueezyClient } from "lemonsqueezy.ts"

export const lemonsqueezy = new LemonsqueezyClient(env.LEMON_SQUEEZY_API_KEY)

const BASE_URL = "https://api.lemonsqueezy.com"

export function getLemonSqueezyClient() {
  const apiKey = env.LEMON_SQUEEZY_API_KEY

  if (!apiKey) {
    throw new Error("Missing LEMON_SQUEEZY_API_KEY environment variable")
  }

  const request = async function <Data = unknown>(params: {
    path: string
    body?: string
    method?: "GET" | "POST" | "PUT" | "DELETE"
  }) {
    const url = [BASE_URL, params.path].join("/")

    const init = {
      headers: getHeaders(apiKey),
      method: params.method,
    }

    const response = await fetch(url, init)

    if (!response.ok) {
      throw new Error(
        `Request failed with status code ${response.status}: ${response.statusText}`
      )
    }

    const data = await response.json()

    return data as Data
  }

  return {
    request,
  }
}

function getHeaders(apiKey: string) {
  return {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer ${apiKey}`,
  }
}
