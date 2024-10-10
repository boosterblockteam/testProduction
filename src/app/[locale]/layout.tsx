import { NextIntlClientProvider, useMessages } from "next-intl";
import "../../styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";
import Web3Provider from "../components/web3/context/Web3Provider";

export const metadata: Metadata = {
  title: "Defily",
  description: "Your Gateway to Web3 and DeFi",
};

interface Props {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Web3Provider>
        <div className="w-full lg:w-[360px] lg:mx-auto">{children}</div>
      </Web3Provider>
    </NextIntlClientProvider>
  );
}
