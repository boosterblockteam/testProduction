export function cutAddress(address: string, start = 6, end = 4): string {
  return `${address.substring(0, start)}...${address.substring(address.length - end)}`;
}