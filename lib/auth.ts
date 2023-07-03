import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { MailerSend, EmailParams, Recipient } from "mailersend"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      from: env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        })

        const mailersend = new MailerSend({
          apiKey: env.MAILSENDER_API_TOKEN,
        })

        const templateId = user?.emailVerified
          ? env.MAILSENDER_SIGN_IN_TEMPLATE
          : env.MAILSENDER_ACTIVATION_TEMPLATE

        if (!templateId) {
          throw new Error("Missing template id")
        }

        const recipients = [new Recipient(identifier)]

        const personalization = [
          {
            email: identifier,
            data: {
              action_url: url,
              product_name: siteConfig.name,
            },
          },
        ]

        const emailParams = new EmailParams()
          .setTo(recipients)
          .setTemplateId(templateId)
          .setPersonalization(personalization)

        const result = mailersend.email.send(emailParams)

        if ((await result).statusCode > 299) {
          throw new Error((await result).body)
        }
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user = session.user || {} // Ensure session.user is defined

        // @ts-ignore
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}
