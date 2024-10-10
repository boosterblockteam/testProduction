import { RankingAccount, TypeAccount, ActiveAccount } from "./moskData";

export const getTypeAccountColor = (type: TypeAccount) => {
    const objectBaseType: Record<TypeAccount, string> = {
        "cuenta propia": "#9d87f6" , 
        "cuenta de referido" :"#ff9142", 
        "cuenta de traspaso": "#189fa8"
    }

    return objectBaseType[type];
}

export const getRankingAccountColor = (ranking: RankingAccount) => {
    const objectBaseRanking: Record<RankingAccount, string> = {
        "jade": "#9b9b9b",
        "sapphire": "#7573a6",
        "ruby": "#9b111e",
        "emerald": "#00ffbf",
        "diamond": "#c8e5eb",
        "blue diamond": "#70d1f4",
        "black diamond": "#000000",
        "crown diamond":"#ffd700",
    }

    return objectBaseRanking[ranking];
}

export const getActiveAccountColor = (active: ActiveAccount) => {
    const objectBaseActive: Record<ActiveAccount, string> = {
        "active NFT": "#004bc6" , 
        "active membership" :"#32bb1b", 
        "active stake": "#622bbb"
    }

    return objectBaseActive[active];
}