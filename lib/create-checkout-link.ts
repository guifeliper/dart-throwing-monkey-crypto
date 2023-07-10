import { User } from "next-auth"

interface CreateCheckoutLinkProps {
  variantId: string
  user: User | null | undefined
}

export function createCheckoutLink({
  variantId,
  user,
}: CreateCheckoutLinkProps): string {
  const baseUrl = new URL(
    `https://harv.lemonsqueezy.com/checkout/buy/${variantId}`
  )

  if (!user) return "/sign-in"

  const email = user?.email
  const name = user?.name
  const userId = user.id

  const url = new URL(baseUrl)
  url.searchParams.append("checkout[custom][user_id]", userId)
  if (email) url.searchParams.append("checkout[email]", email)
  if (name) url.searchParams.append("checkout[name]", name)

  return url.toString()
}
