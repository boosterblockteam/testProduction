/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";
import createNextIntlPlugin from 'next-intl/plugin';
//import dotenv from 'dotenv';

//dotenv.config();

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    domains: ['localhost', 'defily-back.gecko.lat', 'ipfs.io', 'dapp.defily.ai', 'd391b93f5f62d9c15f67142e43841acc.ipfscdn.io', 'defily.ai', 'backend.defily.ai'], // Agrega el dominio  aquí
  },
  env: {
    CLIENT_ID: process.env.CLIENT_ID, 
    POI_CONTRACT: process.env.POI_CONTRACT, 
    ACCOUNT_CONTRACT: process.env.ACCOUNT_CONTRACT, 
    MEMBERS_CONTRACT: process.env.MEMBERS_CONTRACT, 
    CLAIM_CONTRACT: process.env.CLAIM_CONTRACT, 
    TREASURY_CONTRACT: process.env.TREASURY_CONTRACT, 
    STAKING_CONTRACT: process.env.STAKING_CONTRACT, 
    SECRET_KEY: process.env.SECRET_KEY, 
    TOKEN_CONTRACT: process.env.TOKEN_CONTRACT, 
    API_BSC: process.env.API_BSC,
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'encoding');
    return config;
  },
};

export default withNextIntl(withPWA(nextConfig));
