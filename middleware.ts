import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "pt"],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
})

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}

// import { withAuth } from "next-auth/middleware"
// import { withAuthPath } from "./middlewares/withAuthPath"
// import { withLogging } from "./middlewares/withLogging"

// const middlewares = withLogging(withAuthPath)

// export default withAuth(middlewares, {
//   callbacks: {
//     async authorized() {
//       // This is a work-around for handling redirect on auth pages.
//       // We return true here so that the middleware function above
//       // is always called.
//       return true
//     },
//   },
// })

// export const config = {
//   matcher: ["/dashboard/billing", "/login", "/register"],
// }
