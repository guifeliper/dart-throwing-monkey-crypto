export async function getMessages(locale: string) {
  let messages = (await import(`../messages/${locale}.json`)).default

  return messages
}
