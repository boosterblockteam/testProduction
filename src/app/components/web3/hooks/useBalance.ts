import { useActiveAccount } from "thirdweb/react";
import { getWalletBalance } from "thirdweb/wallets";
import { client } from "../client";
import { polygon } from "thirdweb/chains";
import { useEffect, useState } from "react";

export function useBalance(): {
  balance: number; 
  polBalance: number;
} {
  const account = useActiveAccount();
  const [balance, setBalance] = useState(0);
  const [polBalance, setPolBalance] = useState(0);

  useEffect(() => {

    if (account) {

      const balanceInterval = setInterval(async () => {

        try {
          const balance = await getBalance();
          setBalance(balance);
          const polBalance = await getPolBalance();
          setPolBalance(polBalance);
          // console.log({balance, polBalance});
        } catch (error) {
          console.log(error);
        }

      }, 2000);

      return () => clearInterval(balanceInterval);
    }
  }, [account]);

  async function getBalance() {

    if (!account) {
      return 0;
    }

    const balance = await getWalletBalance({
      address: account.address,
      client,
      chain: polygon,
      tokenAddress: process.env.TOKEN_CONTRACT,
    });

    return Number(balance.value) / 1000000;

  }

  async function getPolBalance() {
    if (!account) {
      return 0;
    }

    const balance = await getWalletBalance({
      address: account.address,
      client,
      chain: polygon,
    });

    return (Number(balance.value) / 1000000000) / 1000000000;
     
  }

  return {
    balance,
    polBalance,
  }
}