import { TokenExtendedMetadata } from '../interfaces/token-extended-metadata.interface';
import { getTokenMetadataSlug } from '../utils/token-metadata.util';

import { EvmChainId } from './chain-ids';
import { NETWORKS_DEFAULT_LIST } from './networks';

type NetworkChainId = string;

export const TOKENS_DEFAULT_LIST: Record<NetworkChainId, TokenExtendedMetadata[]> = {
  [EvmChainId.Klaytn]: [
    {
      tokenAddress: '0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167',
      name: 'Orbit Bridge Klaytn USD Tether',
      symbol: 'oUSDT',
      decimals: 6,
      thumbnailUri: 'https://tokens.1inch.io/0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167.png'
    },
    {
      tokenAddress: '0x4fa62f1f404188ce860c8f0041d6ac3765a72e67',
      name: 'Kokoa Stable Dollar',
      symbol: 'KSD',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0x4fa62f1f404188ce860c8f0041d6ac3765a72e67.png'
    },
    {
      tokenAddress: '0x34d21b1e550d73cee41151c77f3c73359527a396',
      name: 'Orbit Bridge Klaytn Ethereum',
      symbol: 'oETH',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0x34d21b1e550d73cee41151c77f3c73359527a396.png'
    },
    {
      tokenAddress: '0x5fff3a6c16c2208103f318f4713d4d90601a7313',
      name: 'KLEVA Protocol',
      symbol: 'KLEVA',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/21122.png'
    }
  ],
  [EvmChainId.BinanceSmartChain]: [
    {
      tokenAddress: '0x55d398326f99059ff775485246999027b3197955',
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png'
    },
    {
      tokenAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      name: 'BUSD Token',
      symbol: 'BUSD',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0x4fabb145d64652a948d72533023f6e7a623c7c53.png'
    },
    {
      tokenAddress: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      name: 'PancakeSwap Token',
      symbol: 'CAKE',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82.png'
    },
    {
      tokenAddress: '0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63',
      name: 'Venus',
      symbol: 'XVS',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63.png'
    }
  ],
  [EvmChainId.Polygon]: [
    {
      tokenAddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      thumbnailUri: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png'
    },
    {
      tokenAddress: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      name: 'USD Coin (PoS)',
      symbol: 'USDC',
      decimals: 6,
      thumbnailUri: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png'
    },
    {
      tokenAddress: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619.png'
    },
    {
      tokenAddress: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
      name: 'Wrapped BTC',
      symbol: 'WBTC',
      decimals: 8,
      thumbnailUri: 'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png'
    }
  ],
  [EvmChainId.Ethereum]: [
    {
      tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      thumbnailUri: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png'
    },
    {
      tokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      thumbnailUri: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png'
    },
    {
      tokenAddress: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      name: 'Wrapped BTC',
      symbol: 'WBTC',
      decimals: 8,
      thumbnailUri: 'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png'
    },
    {
      tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png'
    }
  ],
  [EvmChainId.Arbitrum]: [
    {
      tokenAddress: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      thumbnailUri: 'https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png'
    },
    {
      tokenAddress: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
      name: 'USD Coin (Arb1)',
      symbol: 'USDC',
      decimals: 6,
      thumbnailUri: 'https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png'
    },
    {
      tokenAddress: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
      name: 'Wrapped BTC',
      symbol: 'WBTC',
      decimals: 8,
      thumbnailUri: 'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png'
    },
    {
      tokenAddress: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png'
    }
  ],
  [EvmChainId.Avalanche]: [
    {
      tokenAddress: '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
      name: 'TetherToken',
      symbol: 'USDT',
      decimals: 6,
      thumbnailUri: 'https://tokens.1inch.io/0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7.png'
    },
    {
      tokenAddress: '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
      name: 'Dai Stablecoin',
      symbol: 'DAI.e',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0x6b175474e89094c44da98b954eedeac495271d0f.png'
    },
    {
      tokenAddress: '0x5947bb275c521040051d82396192181b413227a3',
      name: 'Chainlink Token',
      symbol: 'LINK.e',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0x697256caa3ccafd62bb6d3aa1c7c5671786a5fd9.png'
    },
    {
      tokenAddress: '0x62edc0692bd897d2295872a9ffcac5425011c661',
      name: 'GMX',
      symbol: 'GMX',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0x62edc0692bd897d2295872a9ffcac5425011c661.png'
    }
  ],
  [EvmChainId.Optimism]: [
    {
      tokenAddress: '0x4200000000000000000000000000000000000042',
      name: 'Optimism',
      symbol: 'OP',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0x4200000000000000000000000000000000000042.png'
    },
    {
      tokenAddress: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      thumbnailUri: 'https://tokens.1inch.io/0x94b008aa00579c1307b0ef2c499ad98a8ce58e58.png'
    },
    {
      tokenAddress: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
      name: 'Dai stable coin',
      symbol: 'DAI',
      decimals: 18,
      thumbnailUri: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=010'
    },
    {
      tokenAddress: '0x4200000000000000000000000000000000000006',
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png'
    }
  ],
  [EvmChainId.Fantom]: [
    {
      tokenAddress: '0x511d35c52a3c244e7b8bd92c0c297755fbd89212',
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.png'
    },
    {
      tokenAddress: '0x049d68029688eabf473097a2fc38ef61633a3c7a',
      name: 'Frapped USDT',
      symbol: 'fUSDT',
      decimals: 6,
      thumbnailUri: 'https://tokens.1inch.io/0x049d68029688eabf473097a2fc38ef61633a3c7a.png'
    },
    {
      tokenAddress: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      thumbnailUri: 'https://tokens.1inch.io/0xddafbb505ad214d7b80b1f830fccc89b60fb7a83.png'
    },
    {
      tokenAddress: '0x321162cd933e2be498cd2267a90534a804051b11',
      name: 'Bitcoin',
      symbol: 'BTC',
      decimals: 8,
      thumbnailUri: 'https://tokens.1inch.io/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png'
    },
    {
      tokenAddress: '0x511d35c52a3c244e7b8bd92c0c297755fbd89212',
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
      thumbnailUri: 'https://tokens.1inch.io/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.png'
    }
  ]
};

export const defaultTokensMetadata = Object.keys(TOKENS_DEFAULT_LIST).reduce((acc, chainId) => {
  const tokensMetadata = TOKENS_DEFAULT_LIST[chainId].reduce((_acc, { tokenAddress, tokenId, ...tokenMetadata }) => {
    const network = NETWORKS_DEFAULT_LIST.find(item => item.chainId === chainId) ?? NETWORKS_DEFAULT_LIST[0];
    const tokenMetadataSlug = getTokenMetadataSlug(network.chainId, tokenAddress, tokenId);

    return {
      ..._acc,
      [tokenMetadataSlug]: tokenMetadata
    };
  }, {});

  return {
    ...acc,
    ...tokensMetadata
  };
}, {});
