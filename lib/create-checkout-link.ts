import { env } from "@/env.mjs"
import { CreateCheckoutResult } from "@/types/lemon-squeezy"
import { User } from "next-auth"
interface CreateCheckoutLinkProps {
  user: User | null | undefined
}

export async function createCheckoutLink({
  user,
}: CreateCheckoutLinkProps): Promise<string> {
  var myHeaders = new Headers()
  myHeaders.append("Accept", "application/vnd.api+json")
  myHeaders.append("Content-Type", "application/vnd.api+json")
  myHeaders.append("Authorization", `Bearer ${env.LEMON_SQUEEZY_API_KEY}`)

  var raw = JSON.stringify({
    data: {
      type: "checkouts",
      attributes: {
        custom_price: 300,
        checkout_data: {
          name: user?.name,
          email: user?.email,
          custom: {
            user_id: user?.id,
          },
        },
        preview: true,
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: env.LEMON_SQUEEZY_STORE_ID,
          },
        },
        variant: {
          data: {
            type: "variants",
            id: env.LEMON_SQUEEZY_BASIC_MONTHLY_PLAN_ID,
          },
        },
      },
    },
  })

  const result: CreateCheckoutResult = await fetch(
    "https://api.lemonsqueezy.com/v1/checkouts",
    {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      cache: "no-cache",
    }
  )
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.error("error", error))

  return result.data.attributes.url
}
