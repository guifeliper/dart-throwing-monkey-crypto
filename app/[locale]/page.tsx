import { useTranslations } from "next-intl"

export const metadata = {
  title: "Pricing",
}

export default function PricingPage() {
  const t = useTranslations("Index")
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <p>{t("title")}</p>
    </section>
  )
}
