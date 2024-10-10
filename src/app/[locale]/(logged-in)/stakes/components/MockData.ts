export interface ProfitHistoryMyLiquidity {
  id: number;
  amount: number;
  isEarnings: boolean;
  date: string;
  time: string;
}

const monthMap = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
};

// Función para ordenar por año y mes
const sortByDateDesc = (a, b) => {
  if (a.year === b.year) {
    return monthMap[b.month] - monthMap[a.month];
  }
  return b.year - a.year;
};


export const profitHistoryMyLiquidity: ProfitHistoryMyLiquidity[] = [
  {
    id: 1,
    amount: 50,
    isEarnings: true,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 2,
    amount: 50,
    isEarnings: false,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 3,
    amount: 50,
    isEarnings: true,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 4,
    amount: 50,
    isEarnings: false,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 5,
    amount: 50,
    isEarnings: true,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 6,
    amount: 50,
    isEarnings: false,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 7,
    amount: 50,
    isEarnings: true,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 8,
    amount: 50,
    isEarnings: true,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 9,
    amount: 50,
    isEarnings: true,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 10,
    amount: 50,
    isEarnings: false,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 11,
    amount: 50,
    isEarnings: true,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 12,
    amount: 50,
    isEarnings: false,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 13,
    amount: 50,
    isEarnings: true,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 14,
    amount: 50,
    isEarnings: false,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 15,
    amount: 50,
    isEarnings: true,
    date: "2023-11-11",
    time: "12:00"
  },
  {
    id: 16,
    amount: 50,
    isEarnings: true,
    date: "2023-11-11",
    time: "12:00"
  }
];

export const sortedProfitHistoryMyLiquidity = profitHistoryMyLiquidity.sort(sortByDateDesc);

 

export interface InfoMembership {
  id: number;
  plan: string;
  type: string;
  amount: string;
  share: number;
  myProfit: string;
}

export const infoMembership = [
  {
      id: 1,
      plan: "Basic",
      type: "Stake",
      amount: "1,000",
      share: 1,
      myProfit: "10,000" 
  },
  {
      id: 2,
      plan: "Premium",
      type: "Stake",
      amount: "1,000",
      share: 1,
      myProfit: "10,000" 
  },
]


export interface DataOperationsUnStake {
  id: number;
  amountUnStake: string;
  date: string;
  time: string;
}

export const dataOperationsUnStake = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  amountUnStake: "50.00",
  date: '10/10/2023',
  time: '12:00',
}));

