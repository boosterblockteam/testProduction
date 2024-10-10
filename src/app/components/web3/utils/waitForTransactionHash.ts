import { polygon } from "thirdweb/chains";
import { client } from "../client";
import { waitForReceipt } from "thirdweb";

/**
 * Retorna true si hubo un error al aprobar el token y false si no hubo error
 * @param {string} hash hash del transaccion
 * @returns 
 */
export async function waitForTransactionHash(hash: `0x${string}`): Promise<boolean> {

  const receipt = await waitForReceipt({
    client,
    chain: polygon,
    transactionHash: hash,
  });

  console.log({receipt});
  if (receipt.status !== "success") {
    return true
  }

  return false;
}