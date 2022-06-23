import { AccountTokenInput } from '../interfaces/token-input.interface';
import { getTokenMetadataSlug } from '../utils/token-metadata.util';

import { NETWORKS_DEFAULT_LIST } from './networks';

type NetworkChainId = string;

const KLAYTN_CHAIN_ID = '8217';
const TEZOS_CHAIN_ID = 'NetXdQprcVkpaWU';

export const TOKENS_DEFAULT_LIST: Record<NetworkChainId, AccountTokenInput[]> = {
  [KLAYTN_CHAIN_ID]: [
    {
      tokenAddress: '0x02cbe46fb8a1f579254a9b485788f2d86cad51aa',
      name: 'BORA',
      symbol: 'BORA',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3801.png'
    },
    {
      tokenAddress: '0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654',
      name: 'KlaySwap Protocol',
      symbol: 'KSP',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/8296.png'
    },
    {
      tokenAddress: '0xcf87f94fd8f6b6f0b479771f10df672f99eada63',
      name: 'ClaimSwap',
      symbol: 'CLA',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18371.png'
    },
    {
      tokenAddress: '0xe815a060b9279eba642f8c889fab7afc0d0aca63',
      name: 'KLAYMETA',
      symbol: 'META',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/18255.png'
    },
    {
      tokenAddress: '0x5096db80b21ef45230c9e423c373f1fc9c0198dd',
      name: 'WEMIX',
      symbol: 'WEMIX',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7548.png'
    },
    {
      tokenAddress: '0x5c74070fdea071359b86082bd9f9b3deaafbe32b',
      name: 'KDAI',
      symbol: 'KDAI',
      decimals: 18,
      thumbnailUri: ''
    },
    {
      tokenAddress: '0xfd844c2fca5e595004b17615f891620d1cb9bbb2',
      name: 'Wrapped KLAY',
      symbol: 'WKLAY',
      decimals: 18,
      thumbnailUri: ''
    },
    {
      tokenAddress: '0xdcd62c57182e780e23d2313c4782709da85b9d6c',
      name: 'SOMESING',
      symbol: 'SSX',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5612.png'
    },
    {
      tokenAddress: '0xdb116e2dc96b4e69e3544f41b50550436579979a',
      name: 'KlayFi Finance',
      symbol: 'KFI',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/16676.png'
    },
    {
      tokenAddress: '0xe950bdcfa4d1e45472e76cf967db93dbfc51ba3e',
      name: 'KAI',
      symbol: 'KAI',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/20073.png'
    },
    {
      tokenAddress: '0x3cb6be2fc6677a63cb52b07aed523f93f5a06cb4',
      name: 'OBSR',
      symbol: 'OBSR',
      decimals: 8,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3698.png'
    },
    {
      tokenAddress: '0x9e481eb17d3c3c07d7a6ab571b4ba8ef432b5cf2',
      name: 'MyCreditChain',
      symbol: 'MCC',
      decimals: 18,
      thumbnailUri: ''
    },
    {
      tokenAddress: '0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167',
      name: 'oUSDT',
      symbol: 'oUSDT',
      decimals: 6,
      thumbnailUri: ''
    },
    {
      tokenAddress: '0x34d21b1e550d73cee41151c77f3c73359527a396',
      name: 'oETH',
      symbol: 'oETH',
      decimals: 18,
      thumbnailUri: ''
    },
    {
      tokenAddress: '0x9eaefb09fe4aabfbe6b1ca316a3c36afc83a393f',
      name: 'oXRP',
      symbol: 'oXRP',
      decimals: 6,
      thumbnailUri: ''
    }
  ],
  [TEZOS_CHAIN_ID]: [
    {
      tokenAddress: 'KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb',
      name: 'Quipuswap Governance Token',
      symbol: 'QUIPU',
      decimals: 6,
      thumbnailUri: ''
    }
  ]
};

export const defaultTokensMetadata = TOKENS_DEFAULT_LIST[NETWORKS_DEFAULT_LIST[0].chainId].reduce(
  (acc, { tokenAddress, tokenId, ...tokenMetadata }) => {
    const tokenMetadataSlug = getTokenMetadataSlug(NETWORKS_DEFAULT_LIST[0].rpcUrl, tokenAddress, tokenId);

    return {
      ...acc,
      [tokenMetadataSlug]: tokenMetadata
    };
  },
  {}
);
