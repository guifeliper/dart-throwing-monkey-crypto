import Link from "next/link"

import { getMessages } from "@/components/get-messages"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { buttonVariants } from "@/components/ui/button"
import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { NextIntlClientProvider } from "next-intl"
import { getTranslator } from "next-intl/server"

interface MarketingLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function MarketingLayout({
  children,
  params,
}: MarketingLayoutProps) {
  const t = await getTranslator(params.locale ?? "en", "Marketing")
  let messages = await getMessages(params.locale ?? "en")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            <MainNav items={marketingConfig.mainNav} />
          </NextIntlClientProvider>
          <nav>
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              {t("open-app")}
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
