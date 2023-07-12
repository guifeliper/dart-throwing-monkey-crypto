import { createHmac, timingSafeEqual } from "crypto"
export function isSigningSecretValid(body: string, signatureHeader: string) {
  const SIGNING_SECRET = process.env.LEMON_SQUEEZY_SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Missing signing secret. Add "SIGNING_SECRET"')
  }

  const hmac = createHmac("sha256", SIGNING_SECRET)

  const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8")
  const signature = Buffer.from(signatureHeader, "utf8")

  return timingSafeEqual(digest, signature)
}
