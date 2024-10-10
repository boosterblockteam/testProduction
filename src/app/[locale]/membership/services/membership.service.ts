import { HttpRequest } from "@/app/components/services/types/http-request";
import { Membership } from "../types/membership";

export class MembershipService {

  private readonly endpoint: string;

  constructor(
    private readonly baseUrl: string,
    private readonly httpRequest: HttpRequest
  ) {
    this.endpoint = `${this.baseUrl}/memberships`;
  }

  async getMemberships(): Promise<{ memberships: Membership[] }> {
    const response = await this.httpRequest.get<{ memberships: Membership[] }>(`${this.endpoint}`);
    return response.data;
  }

}