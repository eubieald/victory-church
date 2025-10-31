import Link from "next/link";
// i18n
import { useTranslations } from "next-intl";

export default async function NotFound() {
  const t = useTranslations("NotFoundPage");
  return (
    <div className="flex items-center justify-center h-screen text-center flex-col">
      <h2 className="text-3xl font-bold">{t("title")}</h2>
      <div className="mt-4 block">
        <Link href="/" className="text-white bg-blue-400 px-4 py-2 rounded-md">{t("try-again")}</Link>
      </div>
    </div>
  )
}