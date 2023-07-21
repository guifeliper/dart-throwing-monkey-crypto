import { withAuth } from "next-auth/middleware"
import { withAuthPath } from "./middlewares/withAuthPath"
import { withLogging } from "./middlewares/withLogging"

const middlewares = withLogging(withAuthPath)

export default withAuth(middlewares, {
  callbacks: {
    async authorized() {
      // This is a work-around for handling redirect on auth pages.
      // We return true here so that the middleware function above
      // is always called.
      return true
    },
  },
})

export const config = {
  matcher: ["/dashboard/billing", "/login", "/register"],
}
