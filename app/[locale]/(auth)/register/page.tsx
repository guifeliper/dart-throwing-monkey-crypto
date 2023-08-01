import Link from "next/link"

import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "@/components/user-auth-form"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
}

export default function RegisterPage() {
  const t = useTranslations("Login")
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        {t("login")}
      </Link>
      <div className="hidden h-full bg-muted lg:block"></div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("create-account")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("register-description")}
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            {t("terms-description")}{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              {t("terms")}
            </Link>{" "}
            {t("and")}{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              {t("privacy")}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
