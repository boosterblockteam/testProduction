"use client";

import { Manager } from "socket.io-client";

export const manager = new Manager(`${process.env.API_URL}/socket.io/socket.io.js`);

export const nftSelectionSocket = manager.socket("/nft-selection");
