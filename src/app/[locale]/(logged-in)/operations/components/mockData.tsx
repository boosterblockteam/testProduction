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
}

export const profitHistoryOperations: ProfitHistoryOperations[] = Array(20)
  .fill(null)
  .map((_, index) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const myShare = Math.floor(Math.random() * 10) + 1; // Numeros del 1 al 10
    const month = monthNames[index % 12]; // Cada 50 iteraciones cambia de mes
    const year = 2024;
    const date = new Date(2023, 10 + Math.floor(index / 15), 1 + (index % 30));
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
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript comienzan en 0
    const anio = fecha.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;

    return {
      id: index + 1,
      month,
      year,
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
