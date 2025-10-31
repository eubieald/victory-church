//Ui
import { SessionProvider } from "next-auth/react";
import Hero from "../components/ui/hero";
import HeroVideo from "../components/ui/hero-video";
// i18n
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");
  return (
    <main>
      <Hero
        title={t("title")}
        description={t("description")}
        heroElement={<HeroVideo />}
      />
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}
