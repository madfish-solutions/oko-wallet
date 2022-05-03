import { NetworksValueEnum } from '../enums/network.enum';

export const TokensMetadata = {
  [NetworksValueEnum.KlaytnMainnet]: {
    name: 'KLAY',
    symbol: 'KLAY',
    decimals: 6
  },
  [NetworksValueEnum.KlaytnBaobabTestnet]: {
    name: 'KLAY',
    symbol: 'KLAY',
    decimals: 6
  },
  [NetworksValueEnum.Ethereum]: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 6
  },
  [NetworksValueEnum.BinanceSmartChain]: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 6
  },
  [NetworksValueEnum.Moonbeam]: {
    name: 'GLMR',
    symbol: 'GLMR',
    decimals: 6
  }
};
