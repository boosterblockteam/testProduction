import { HttpRequest } from "@/app/components/services/types/http-request";
import { Poi } from "@/app/components/web3/types/poi";

export class PoiService {

  private readonly endpoint: string;

  constructor(
    private readonly baseUrl: string,
    private readonly httpRequest: HttpRequest
  ) {
    this.endpoint = `${this.baseUrl}/pois/client`;
  }

  async updateImage(wallet: string, formData: FormData): Promise<{ poi: Poi }> {
    const response = await this.httpRequest.postFile<{ poi: Poi }>(`${this.endpoint}/${wallet}/update-image`, {
      body: formData,
      headers: {}
    });
    return response.data;
  }

}
