import { NetworksValueEnum } from '../enums/network.enum';
import { TokenType } from '../types/token.type';

export const GasTokensMetadata: Record<NetworksValueEnum, TokenType> = {
  [NetworksValueEnum.KlaytnMainnet]: {
    name: 'Klaytn Token',
    symbol: 'KLAY',
    decimals: 18,
    address: 'klay',
    thumbnailUri: '',
    tokenId: undefined
  },
  [NetworksValueEnum.KlaytnBaobabTestnet]: {
    name: 'Klaytn Token',
    symbol: 'KLAY',
    decimals: 18,
    address: 'klay',
    thumbnailUri: '',
    tokenId: undefined
  },
  [NetworksValueEnum.Ethereum]: {
    name: 'Ether Token',
    symbol: 'ETH',
    decimals: 18,
    address: 'ether',
    thumbnailUri: '',
    tokenId: undefined
  },
  [NetworksValueEnum.BinanceSmartChain]: {
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 8,
    address: 'bnb',
    thumbnailUri: '',
    tokenId: undefined
  },
  [NetworksValueEnum.Moonbeam]: {
    name: 'Moonbeam Token',
    symbol: 'GLMR',
    decimals: 9,
    address: 'glmr',
    thumbnailUri: '',
    tokenId: undefined
  },
  [NetworksValueEnum.Tezos]: {
    name: 'Tezos Token',
    symbol: 'Tezos',
    decimals: 6,
    address: 'tez',
    thumbnailUri: '',
    tokenId: undefined
  }
};
