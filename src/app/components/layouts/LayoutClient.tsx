"use client";
import { usePathname } from "next/navigation";
import Footer from "../generals/Footer";

interface Props {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: Props) {
  const pahtname = usePathname();

  return (
    <div className="flex flex-col justify-between min-h-screen lg:max-w-[360px] lg:mx-auto overflow-hidden">
      <div>{children}</div>

      {pahtname === "/accountLogin" ? null : <Footer />}
    </div>
  );
}
