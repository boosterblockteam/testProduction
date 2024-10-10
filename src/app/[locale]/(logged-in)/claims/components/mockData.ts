export interface DataOperationsClaim {
    id: number;
    amountClaim: string;
    date: string;
    time: string;
    amountProfit: string;
    amountFee: string;
}

export const dataOperationsClaim = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    amountClaim: "100.00",
    date: '10/10/2022',
    time: '12:00',
    amountProfit: "90.00",
    amountFee: "10.00"
}));