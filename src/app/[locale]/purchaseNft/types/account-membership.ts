import { Membership } from "../../membership/types/membership";

export type AccountMembership = {
  uuid: string;
  accountId: number;
  membershipId: number;
  time: number;
  expire: number;
  staked: number;
  membership: Membership;
}