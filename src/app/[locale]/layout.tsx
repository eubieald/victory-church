import { Inter } from "next/font/google";
import "../globals.css";
// Font
const inter = Inter({ subsets: ["latin"] });
// Next utils
import { useMessages, NextIntlClientProvider } from "next-intl";
// Page Layout
import Header from "../components/page-layout/header";

export type Props = {
  children: React.ReactNode,
  params: {
    locale: "en" | "jp";
  }
}

const RootLayout: React.FC<Props> = ({
  children,
  params,
}: Props) => {
  const { locale } = params;
  const messages = useMessages();
  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </NextIntlClientProvider>
    </html>
  );
}

export default RootLayout