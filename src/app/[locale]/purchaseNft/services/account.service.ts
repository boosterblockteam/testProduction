import { HttpRequest } from "@/app/components/services/types/http-request";
import { Account } from "../types/account";
import { NftToBuy } from "../types/nft-to-buy";

export class AccountService {

  private readonly endpoint: string;

  constructor(
    private readonly baseUrl: string,
    private readonly httpRequest: HttpRequest
  ) {
    this.endpoint = `${this.baseUrl}/accounts/client`;
  }

  async getAccounts(wallet: string): Promise<{ accounts: Account[] }> {
    const response = await this.httpRequest.get<{ accounts: Account[] }>(`${this.endpoint}/${wallet}`);
    return response.data;
  }

  async getSelectedAccount(wallet: string): Promise<{ account: Account }> {
    const response = await this.httpRequest.get<{ account: Account }>(`${this.endpoint}/${wallet}/selected`);
    return response.data;
  }

  async selectAccount(wallet: string, accountId: number): Promise<{ account: Account }> {
    const response = await this.httpRequest.post<{ account: Account }>(`${this.endpoint}/${wallet}/select`, {
      body: {
        accountId,
      },
    });
    return response.data;
  }

  async changeLegSide(wallet: string, legSide: string): Promise<{ account: Account }> {
    const response = await this.httpRequest.post<{ account: Account }>(`${this.endpoint}/${wallet}/change-leg-side`, {
      body: {
        legSide,
      },
    });
    return response.data;
  }

  async getNFTsToBuy(): Promise<{ nftsToBuy: NftToBuy[] }> {
    const response = await this.httpRequest.get<{ nftsToBuy: NftToBuy[] }>(`${this.endpoint}/nfts`);
    console.log({response});
    return response.data;
  }
}