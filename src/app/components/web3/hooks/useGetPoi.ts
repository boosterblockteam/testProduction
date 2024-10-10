import { useEffect, useState } from "react";
import { readContract } from "thirdweb";
import { useActiveAccount, useAutoConnect } from "thirdweb/react";
import { poiContract } from "../contracts/poi.contract";
import { decryptHex } from "../utils/crypt";
import { Poi } from "../types/poi";

export function useGetPoi(): {
  poi: Poi | null;
  isLoading: boolean;
  loadPoi: () => Promise<void>;
} {
  const [poi, setPoi] = useState<Poi | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Este hook depende de un ConnectButon o de useAutoConnect para traer datos de la wallet
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      loadPoi();
    }
  }, [account]);

  async function loadPoi() {

    if (!account) {
      return;
    }

    setIsLoading(true);

    try {
      const poi = await readContract({
        contract: poiContract,
        method: "personalDataMap",
        params: [account.address],
      })

      // console.log({poi});

      // console.log([
      //   decryptHex(poi[0]),
      //   decryptHex(poi[1]),
      //   decryptHex(poi[2]),
      //   decryptHex(poi[3]),
      //   decryptHex(poi[4]),
      //   decryptHex(poi[5]),
      //   decryptHex(poi[6]),
      //   decryptHex(poi[7]),
      //   decryptHex(poi[8]),
      //   decryptHex(poi[9]),
      //   decryptHex(poi[10]),
      //   decryptHex(poi[11]),
      //   decryptHex(poi[12]),
      //   decryptHex(poi[13]),
      //   decryptHex(poi[14]),
      // ])

      if (poi[0]) {
        // 7 imgLink
        setPoi({
          email: decryptHex(poi[0]),
          fullName: decryptHex(poi[1]),
          username: decryptHex(poi[2]),
          phone: decryptHex(poi[3]),
          country: decryptHex(poi[4]),
          gender: decryptHex(poi[5]),
          dateOfBirth: decryptHex(poi[6]),
          imageLink: decryptHex(poi[7]),
          fbLink: decryptHex(poi[8]),
          igLink: decryptHex(poi[9]),
          youtubeLink: decryptHex(poi[10]),
          yTWelcomeLink: decryptHex(poi[11]),
          tikTokLink: decryptHex(poi[12]),
          wspLink: decryptHex(poi[13]),
          bio: decryptHex(poi[14]),
        })

      }

    } catch (error) {

      console.log(error);

      if (error instanceof Error) {
        if (error.message === 'execution reverted') {
          // pendiente: Notificar que el usuario tuvo un error si es un mensaje diferente
        }
      }
      
      setPoi(null);

    }

    setIsLoading(false);
  }

  return {
    poi,
    isLoading,
    loadPoi,
  }
}