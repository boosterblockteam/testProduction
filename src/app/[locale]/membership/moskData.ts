export interface PlansMembership {
    id: number;
    plan: string;
    price: string;
    minStake: string;
    maxStake: string;
    fee: string;
    expiration: number;
    performanceFee: number;
}

const plansMembership = [
    {
        id: 6,
        plan: "Professional", // 1
        price: "1,000",
        minStake: "200",
        maxStake: "15,000",
        fee: "0",
        expiration: 365,
        performanceFee: 35
    },
    {
        id: 1,
        plan: "Pay As You Go", // 2
        price: null,
        minStake: "400",
        maxStake: "9,999",
        fee: "10",
        expiration: null,
        performanceFee: 50
    },
    {
        id: 2,
        plan: "Pay As You Go +", // 3
        price: null,
        minStake: "500",
        maxStake: "9,999",
        fee: "10",
        expiration: null,
        performanceFee: 50
    },
    {
        id: 3,
        plan: "Basic", // 4
        price: "100",
        minStake: "200",
        maxStake: "1,000",
        fee: "0",
        expiration: 365,
        performanceFee: 50
    },
    {
        id: 4,
        plan: "Essential", // 5
        price: "250",
        minStake: "200",
        maxStake: "2,500",
        fee: "0",
        expiration: 365,
        performanceFee: 45
    },
    {
        id: 5,
        plan: "Premium", // 6
        price: "500",
        minStake: "200",
        maxStake: "5,000",
        fee: "0",
        expiration: 365,
        performanceFee: 40
    },
    {
        id: 7,
        plan: "Ultimate", // 7
        price: "5,000",
        minStake: "200",
        maxStake: "100,000",
        fee: "0",
        expiration: 365,
        performanceFee: 30
    },
    {
        id: 8,
        plan: "Max", // 9
        price: "10,000",
        minStake: "200",
        maxStake: "1M",
        fee: "0",
        expiration: 365,
        performanceFee: 25
    },
]

export default plansMembership