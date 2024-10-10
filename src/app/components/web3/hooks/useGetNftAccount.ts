import { useEffect, useState } from "react";
import { readContract } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { nftContract } from "../contracts/nft.contract";

export function useGetNftAccount(): {
  nftAccount: string | null;
  isLoading: boolean;
} {

  const [nftAccount, setNftAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      getNftAccount();
    }
  }, [account]);

  async function getNftAccount() {

    if (!account) {
      return;
    }

    try {
      const nftNumber = await readContract({ 
        contract: nftContract,
        method: "arrayInfo",
        params: [account.address, BigInt(0)],
      });
  
      const accountInfo = await readContract({ 
        contract: nftContract,
        method: "accountInfo",
        params: [nftNumber],
      });

      console.log({arrayInfo: nftNumber, accountInfo});

      setNftAccount(accountInfo?.[1]?.toString() || null);
    } catch (error) {

      console.log(error);

      if (error instanceof Error) {
        if (error.message === 'execution reverted') {
          // pendiente: Notificar que el usuario tuvo un error si es un mensaje diferente
        }
      }
      
      setNftAccount(null);
    }

    setIsLoading(false);
  }

  return {
    nftAccount,
    isLoading,
  }


}