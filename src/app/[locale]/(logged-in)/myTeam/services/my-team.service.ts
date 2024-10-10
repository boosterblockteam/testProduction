import { HttpRequest } from "@/app/components/services/types/http-request";
import { UsersReferral } from "../components/MyTeam";
import { SeasonDates } from "../types/SeasonDates";

export class MyTeamService {

  private readonly endpoint: string;

  constructor(
    private readonly baseUrl: string,
    private readonly httpRequest: HttpRequest
  ) {
    this.endpoint = `${this.baseUrl}/my-team`;
  }

  async getSeason(): Promise<SeasonDates> {
    const response = await this.httpRequest.get<SeasonDates>(`${this.endpoint}/season`);
    return response.data;
  }

  async getMyTeam(wallet: string): Promise<{ usersReferral: UsersReferral }> {
    const response = await this.httpRequest.get<{ usersReferral: UsersReferral }>(`${this.endpoint}/${wallet}`);
    return response.data;
  }

  async getLastLeft(wallet: string): Promise<{ usersReferral: UsersReferral }> {
    const response = await this.httpRequest.get<{ usersReferral: UsersReferral }>(`${this.endpoint}/last-left/${wallet}`);
    return response.data;
  }

  async getLastRight(wallet: string): Promise<{ usersReferral: UsersReferral }> {
    const response = await this.httpRequest.get<{ usersReferral: UsersReferral }>(`${this.endpoint}/last-right/${wallet}`);
    return response.data;
  }

}