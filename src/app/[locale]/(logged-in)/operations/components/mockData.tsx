export interface ProfitHistoryOperations {
  id: number;
  month: string;
  year: number;
  amountProfit: string;
  myShare: number;
  date: string;
  profit: string;
  market: string;
  product: string;
  side: string;
  amount: string;
  pnl: string;
  statusOperation: string;
  statusTransaction: string;
  openDate: string;
  openPrice: string;
  closeDate: string | number;
  closePrice: string;
  orderType: string;
  hash: string;
  operationTime: string;
  season: string;
  performance: number;
}

export const profitHistoryOperations: ProfitHistoryOperations[] = [
  { month: "November", year: 2022, performance: 13.56 },
  { month: "December", year: 2022, performance: 9.22 },
  { month: "January", year: 2023, performance: 12.23 },
  { month: "February", year: 2023, performance: 18.23 },
  { month: "March", year: 2023, performance: 15.43 },
  { month: "April", year: 2023, performance: 12.54 },
  { month: "May", year: 2023, performance: 5.34 },
  { month: "June", year: 2023, performance: -3.65 },
  { month: "July", year: 2023, performance: 9.12 },
  { month: "August", year: 2023, performance: 12.67 },
  { month: "September", year: 2023, performance: 8.54 },
  { month: "October", year: 2023, performance: 11.4 },
  { month: "November", year: 2023, performance: 16.4 },
  { month: "December", year: 2023, performance: 13.45 },
  { month: "January", year: 2024, performance: 15.43 },
  { month: "February", year: 2024, performance: 23.54 },
  { month: "March-July", year: 2024, performance: 0 },
  { month: "August", year: 2024, performance: 12.5 },
  { month: "September", year: 2024, performance: 8.23 },
].map((item, index) => {
  const myShare = Math.floor(Math.random() * 10) + 1;
  const date = new Date(
    item.year,
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].indexOf(
      item.month.split("-")[0]
    ),
    1
  );
  const profit = (Math.floor(Math.random() * 4000) + 1000).toString();
  const btcAmount = (Math.random() * 0.3 + 0.1).toFixed(2);
  const pnl = (Math.floor(Math.random() * 200) + 100).toString();
  const pnlPercentage = (Math.floor(Math.random() * 10) + 1).toString();
  const season = (Math.floor(Math.random() * 100) + 1).toString();
  const openPrice = (Math.floor(Math.random() * 5000) + 58000).toString();
  const closePrice = (Number(openPrice) + Math.floor(Math.random() * 4000) - 2000).toString();
  const operationTime = (Math.floor(Math.random() * 200) + 100).toString();

  const fechaIso = new Date(date.getTime() + Math.random() * 86400000).toISOString();
  const fecha = new Date(fechaIso);

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();
  const fechaFormateada = `${dia}/${mes}/${anio}`;

  return {
    ...item,
    id: index + 1,
    amountProfit: `${profit}.00`,
    myShare,
    date: date.toISOString().split("T")[0],
    profit: `$${profit}.00`,
    market: "Futures",
    product: "BTC/USDT",
    side: Math.random() > 0.5 ? "Buy" : "Sell",
    amount: `${btcAmount} BTC`,
    pnl: `$${pnl} (${pnlPercentage}%)`,
    statusOperation: Math.random() > 0.3 ? "Closed" : "Open",
    statusTransaction: Math.random() > 0.5 ? "Executed" : "Waiting",
    openDate: fechaFormateada,
    openPrice: `$${openPrice}.00`,
    closeDate: new Date(date.getTime() + Math.random() * 86400000 + 86400000).toISOString(),
    closePrice: `$${closePrice}.00`,
    orderType: Math.random() > 0.5 ? "Limit" : "Market",
    hash: `0x${Math.floor(Math.random() * 2 ** 64).toString(16)}`,
    operationTime: `${Math.floor(Number(operationTime) / 24)} DAYS ${Number(operationTime) % 24} HRS`,
    season,
  };
});
