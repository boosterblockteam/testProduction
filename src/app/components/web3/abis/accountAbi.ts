export const accountAbi = [{
  "inputs": [{
    "internalType": "address",
    "name": "target",
    "type": "address"
  }],
  "name": "AddressEmptyCode",
  "type": "error"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "implementation",
    "type": "address"
  }],
  "name": "ERC1967InvalidImplementation",
  "type": "error"
},
{
  "inputs": [],
  "name": "ERC1967NonPayable",
  "type": "error"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "sender",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }],
  "name": "ERC721IncorrectOwner",
  "type": "error"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "operator",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "ERC721InsufficientApproval",
  "type": "error"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "approver",
    "type": "address"
  }],
  "name": "ERC721InvalidApprover",
  "type": "error"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "operator",
    "type": "address"
  }],
  "name": "ERC721InvalidOperator",
  "type": "error"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }],
  "name": "ERC721InvalidOwner",
  "type": "error"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "receiver",
    "type": "address"
  }],
  "name": "ERC721InvalidReceiver",
  "type": "error"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "sender",
    "type": "address"
  }],
  "name": "ERC721InvalidSender",
  "type": "error"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "ERC721NonexistentToken",
  "type": "error"
},
{
  "inputs": [],
  "name": "FailedInnerCall",
  "type": "error"
},
{
  "inputs": [],
  "name": "InvalidInitialization",
  "type": "error"
},
{
  "inputs": [],
  "name": "NotInitializing",
  "type": "error"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }],
  "name": "OwnableInvalidOwner",
  "type": "error"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "account",
    "type": "address"
  }],
  "name": "OwnableUnauthorizedAccount",
  "type": "error"
},
{
  "inputs": [],
  "name": "UUPSUnauthorizedCallContext",
  "type": "error"
},
{
  "inputs": [{
    "internalType": "bytes32",
    "name": "slot",
    "type": "bytes32"
  }],
  "name": "UUPSUnsupportedProxiableUUID",
  "type": "error"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "string",
    "name": "NFTName",
    "type": "string"
  },
  {
    "indexed": false,
    "internalType": "address",
    "name": "user",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "sponsor",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "nftNumber",
    "type": "uint256"
  }],
  "name": "AccountCreated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "string",
    "name": "newName",
    "type": "string"
  }],
  "name": "AccountRenamed",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "AccountTransferred",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "address",
    "name": "adminWallet",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "AdminWalletClaimed",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
  }],
  "name": "AllAccountsTransferred",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "approved",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "Approval",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "operator",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
  }],
  "name": "ApprovalForAll",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "directVol",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "referredTokenId",
    "type": "uint256"
  }],
  "name": "DirectVolumeUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "globalVol",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "level",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "referredTokenId",
    "type": "uint256"
  }],
  "name": "GlobalVolumeUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint64",
    "name": "version",
    "type": "uint64"
  }],
  "name": "Initialized",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "membershipId",
    "type": "uint256"
  }],
  "name": "MembershipUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "level",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "MissedProfitUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "directVol",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "referredTokenId",
    "type": "uint256"
  }],
  "name": "NewDirect",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "globalVol",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "level",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "referredTokenId",
    "type": "uint256"
  }],
  "name": "NewGlobal",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "previousOwner",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "level",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "PayedProfitUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "level",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "ProfitUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "rank",
    "type": "uint256"
  }],
  "name": "RankUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "user",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "uint256",
    "name": "nftUse",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "RewardClaimed",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "referredTokenId",
    "type": "uint256"
  }],
  "name": "RewardFromReferral",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "referredTokenId",
    "type": "uint256"
  }],
  "name": "RewardFromReferralAdmin",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "StakedUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "directVol",
    "type": "uint256"
  }],
  "name": "TotalDirectUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "globalVol",
    "type": "uint256"
  }],
  "name": "TotalGlobalUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "Transfer",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "implementation",
    "type": "address"
  }],
  "name": "Upgraded",
  "type": "event"
},
{
  "inputs": [],
  "name": "UPGRADE_INTERFACE_VERSION",
  "outputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "USDT",
  "outputs": [{
    "internalType": "contract IERC20",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "name": "accountInfo",
  "outputs": [{
    "internalType": "uint256",
    "name": "NFTID",
    "type": "uint256"
  },
  {
    "internalType": "string",
    "name": "NFTName",
    "type": "string"
  },
  {
    "internalType": "string",
    "name": "NFTCid",
    "type": "string"
  },
  {
    "internalType": "uint256",
    "name": "sponsorNFT",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "uplineNft",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "legSide",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "myLeft",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "myRight",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "creationData",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "childrens",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "staked",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "rank",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "totalDirect",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "totalGlobal",
    "type": "uint256"
  },
  {
    "internalType": "bool",
    "name": "nextLegIsLeft",
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "adminWallet",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "adminWalletsRewards",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "amount",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "approve",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "name": "arrayInfo",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "claimAdminWallet",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_nftUse",
    "type": "uint256"
  }],
  "name": "claimNftReward",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "string",
    "name": "_nameAccount",
    "type": "string"
  },
  {
    "internalType": "address",
    "name": "_user",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "_sponsor",
    "type": "uint256"
  },
  {
    "internalType": "string",
    "name": "NFTCid",
    "type": "string"
  },
  {
    "internalType": "uint256",
    "name": "legSide",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_nftNumber",
    "type": "uint256"
  }],
  "name": "createNFT",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "getApproved",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  }],
  "name": "getCantLevles",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  }],
  "name": "getCantLevlesMissedProfit",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  }],
  "name": "getCantLevlesPayedProfit",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  }],
  "name": "getCantLevlesProfit",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_level",
    "type": "uint256"
  }],
  "name": "getCantPeronInLevel",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  }],
  "name": "getDirectVolCount",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_pos",
    "type": "uint256"
  }],
  "name": "getDirectVolInfo",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "level",
    "type": "uint256"
  }],
  "name": "getGlobalVolCount",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_level",
    "type": "uint256"
  }],
  "name": "getMissedProfit",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_level",
    "type": "uint256"
  }],
  "name": "getPayedProfit",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_level",
    "type": "uint256"
  }],
  "name": "getProfit",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  }],
  "name": "getRank",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "getSelectedImages",
  "outputs": [{
    "internalType": "uint256[]",
    "name": "",
    "type": "uint256[]"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  }],
  "name": "getTotalDirect",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  }],
  "name": "getTotalGlobal",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "_usdtAddress",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "_poiContractAddress",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "_memberContract",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "_stakingAddress",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "initialize",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "operator",
    "type": "address"
  }],
  "name": "isApprovedForAll",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "membershipContract",
  "outputs": [{
    "internalType": "contract MembershipContract",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "membershipContractAddress",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "name",
  "outputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "name": "nftImage",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "ownerOf",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "poi",
  "outputs": [{
    "internalType": "contract POI",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "proxiableUUID",
  "outputs": [{
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "rankAddress",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenIds",
    "type": "uint256"
  },
  {
    "internalType": "string",
    "name": "_nameAccount",
    "type": "string"
  }],
  "name": "renameAccount",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "name": "rewards",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "safeTransferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "internalType": "bytes",
    "name": "data",
    "type": "bytes"
  }],
  "name": "safeTransferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "name": "selectedImages",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "_wallet",
    "type": "address"
  }],
  "name": "setAdminWallet",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "setAmount",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "operator",
    "type": "address"
  },
  {
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
  }],
  "name": "setApprovalForAll",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "_memberContract",
    "type": "address"
  }],
  "name": "setMemberContract",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "_memberContract",
    "type": "address"
  }],
  "name": "setMembershipContractAddress",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "_poiContract",
    "type": "address"
  }],
  "name": "setPoiContract",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "_rankAddress",
    "type": "address"
  }],
  "name": "setRankAddress",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "setSplitAdminAmount",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "setSplitAmount",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "_stakingAddress",
    "type": "address"
  }],
  "name": "setStakingAddress",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "string",
    "name": "_uriPrefix",
    "type": "string"
  }],
  "name": "setUriPrefix",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "string",
    "name": "_uriSuffix",
    "type": "string"
  }],
  "name": "setUriSuffix",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "_usdtAddress",
    "type": "address"
  }],
  "name": "setUsdtContract",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "splitAdminAmount",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "splitAmount",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "stakingAddress",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "bytes4",
    "name": "interfaceId",
    "type": "bytes4"
  }],
  "name": "supportsInterface",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "symbol",
  "outputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "tokenIds",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  }],
  "name": "tokenURI",
  "outputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "name": "totalPayedRewards",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "_from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "_to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  }],
  "name": "transferAccount",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "_from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "_to",
    "type": "address"
  }],
  "name": "transferAllAccounts",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }],
  "name": "transferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_directVol",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "referredTokenId",
    "type": "uint256"
  }],
  "name": "updateDirectVol",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_globalVol",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "level",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "referredTokenId",
    "type": "uint256"
  }],
  "name": "updateGlobalVol",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenIds",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_membershipId",
    "type": "uint256"
  }],
  "name": "updateMembership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "level",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "updateMissedProfit",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "level",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "updatePayedProfit",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "level",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "updateProfit",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenIds",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_rank",
    "type": "uint256"
  }],
  "name": "updateRank",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenIds",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_amount",
    "type": "uint256"
  }],
  "name": "updateStaked",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_directVol",
    "type": "uint256"
  }],
  "name": "updateTotalDirect",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "uint256",
    "name": "_tokenId",
    "type": "uint256"
  },
  {
    "internalType": "uint256",
    "name": "_globalVol",
    "type": "uint256"
  }],
  "name": "updateTotalGlobal",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "address",
    "name": "newImplementation",
    "type": "address"
  },
  {
    "internalType": "bytes",
    "name": "data",
    "type": "bytes"
  }],
  "name": "upgradeToAndCall",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
},
{
  "inputs": [],
  "name": "uriPrefix",
  "outputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "uriSuffix",
  "outputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [{
    "internalType": "string",
    "name": "",
    "type": "string"
  }],
  "name": "usedName",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "stateMutability": "view",
  "type": "function"
}] as const