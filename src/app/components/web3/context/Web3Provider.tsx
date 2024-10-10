"use client";

import { PropsWithChildren } from "react";
import { ThirdwebProvider } from "thirdweb/react";
import UserProvider from "./UserProvider";

export default function Web3Provider({ children }: PropsWithChildren) {

  return (
    <ThirdwebProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </ThirdwebProvider>
  );

}
