import { getMessages } from "@/components/get-messages"
import { NextIntlClientProvider } from "next-intl"

interface DashboardLayoutProps {
  children?: React.ReactNode
  params: {
    locale: string
  }
}

export default async function BillingLayout({
  children,
  params: { locale },
}: DashboardLayoutProps) {
  let messages = await getMessages(locale ?? "en")

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
