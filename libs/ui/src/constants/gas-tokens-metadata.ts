import { NetworksNameEnum } from '../enums/network.enum';
import { TokenType } from '../types/token.type';

export const GasTokensMetadata: Record<NetworksNameEnum, TokenType> = {
  [NetworksNameEnum.KlaytnMainnet]: {
    name: 'Klaytn Token',
    symbol: 'KLAY',
    decimals: 18,
    address: 'klay',
    thumbnailUri: '',
    tokenId: undefined
  },
  [NetworksNameEnum.KlaytnBaobabTestnet]: {
    name: 'Klaytn Token',
    symbol: 'KLAY',
    decimals: 18,
    address: 'klay',
    thumbnailUri: '',
    tokenId: undefined
  },
  [NetworksNameEnum.Ethereum]: {
    name: 'Ether Token',
    symbol: 'ETH',
    decimals: 18,
    address: 'ether',
    thumbnailUri: '',
    tokenId: undefined
  },
  [NetworksNameEnum.BinanceSmartChain]: {
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 8,
    address: 'bnb',
    thumbnailUri: '',
    tokenId: undefined
  },
  [NetworksNameEnum.Moonbeam]: {
    name: 'Moonbeam Token',
    symbol: 'GLMR',
    decimals: 9,
    address: 'glmr',
    thumbnailUri: '',
    tokenId: undefined
  },
  [NetworksNameEnum.Tezos]: {
    name: 'Tezos Token',
    symbol: 'Tezos',
    decimals: 6,
    address: 'tez',
    thumbnailUri: '',
    tokenId: undefined
  }
};
