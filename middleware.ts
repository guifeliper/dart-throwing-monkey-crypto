import { withAuth } from "next-auth/middleware"
import createIntlMiddleware from "next-intl/middleware"
import { NextRequest } from "next/server"

const locales = ["en", "pt"]
const publicPages = [
  "/",
  "/login",
  "/register",
  "/dashboard",
  "/pricing",
  "/tokenDrawn",
]

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
})

const authMiddleware = withAuth(
  async function onSuccess(req) {
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
    },
  }
)

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
    "i"
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as any)(req)
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
