import { AccountService } from "@/app/[locale]/purchaseNft/services/account.service"
import { FetchHttpRequest } from "../services/fetch-http-request"
import { PoiService } from "@/app/[locale]/(logged-in)/profile/services/poi.service"
import { MyTeamService } from "@/app/[locale]/(logged-in)/myTeam/services/my-team.service"
import { MembershipService } from "@/app/[locale]/membership/services/membership.service"

export class ServiceProvider {

  private static instance: ServiceProvider

  private accountService: AccountService
  private poiService: PoiService
  private myTeamService: MyTeamService
  private membershipService: MembershipService

  private constructor() {
    const baseUrl = process.env.API_URL || "http://localhost:4000"
    const httpRequest = new FetchHttpRequest()

    this.accountService = new AccountService(baseUrl, httpRequest)
    this.poiService = new PoiService(baseUrl, httpRequest)
    this.myTeamService = new MyTeamService(baseUrl, httpRequest)
    this.membershipService = new MembershipService(baseUrl, httpRequest)
  }

  static getInstance(): ServiceProvider {
    if (!ServiceProvider.instance) {
      ServiceProvider.instance = new ServiceProvider()
    }
    return ServiceProvider.instance
  }

  getServices(): {
    accountService: AccountService,
    poiService: PoiService,
    myTeamService: MyTeamService,
    membershipService: MembershipService,
  } {
    return {
      accountService: this.accountService,
      poiService: this.poiService,
      myTeamService: this.myTeamService,
      membershipService: this.membershipService,
    }
  }

}
