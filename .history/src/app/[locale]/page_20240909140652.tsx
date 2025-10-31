// pages/page.tsx
// Ui
import { SessionProvider } from "next-auth/react";
import Hero from "../components/ui/hero";
import HeroVideo from "../components/ui/hero-video";
// i18n
import { useTranslations } from "next-intl";

export default function Home({ session }) {
  const t = useTranslations("Index");
  return (
    <SessionProvider session={session}>
      <main>
        <Hero
          title={t("title")}
          description={t("description")}
          heroElement={<HeroVideo />}
        />
      </main>
    </SessionProvider>
  );
}

// Optionally, if you need to fetch the session server-side
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
