import Link from "next/link"

import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export const metadata = {
  title: "Pricing",
}

export default function PricingPage({ params: { locale } }) {
  const t = useTranslations("Pricing")
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          {t("title")}
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {t.rich("description", {
            locale,
            strong: (children) => <strong>{children}</strong>,
            br: () => <br />,
          })}
        </p>
      </div>
      <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">{t("included")}</h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> {t("pies")}
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> {t("rebalance")}
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> {t("dashboard")}
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> {t("support")}
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-7xl font-bold">$4</h4>
            <p className="text-sm font-medium text-muted-foreground">
              {t("billed-monthly")}
            </p>
          </div>
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            {t("started")}
          </Link>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
          {t.rich("alert-description", {
            name: siteConfig.name,
            strong: (children) => <strong>{children}</strong>,
            br: () => <br />,
          })}
        </p>
      </div>
    </section>
  )
}
