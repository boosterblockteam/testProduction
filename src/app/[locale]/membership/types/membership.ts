export type Membership = {
  uuid: string,
  id: number;
  plan: string;
  price: number;
  minStake: number;
  maxStake: number;
  fee: number;
  expiration: number;
  performanceFee: number;
}