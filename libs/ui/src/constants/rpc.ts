import { NetworksValueEnum } from './networks';

export enum RpcEnum {
  KlaytnBaobabTestnet = 'https://api.baobab.klaytn.net:8651',
  KlaytnMainnet = 'https://kaikas.cypress.klaytn.net:8651/',
  Ethereum = 'https://mainnet.infura.io/v3/',
  BinanceSmartChain = 'https://bsc-dataseed.binance.org/',
  Moonbeam = 'https://rpc.api.moonbeam.network',
  Tezos = 'https://mainnet.api.tez.ie'
}

export const RpcUrl = {
  [NetworksValueEnum.KlaytnMainnet]: RpcEnum.KlaytnMainnet,
  [NetworksValueEnum.KlaytnBaobabTestnet]: RpcEnum.KlaytnBaobabTestnet,
  [NetworksValueEnum.Ethereum]: RpcEnum.Ethereum,
  [NetworksValueEnum.BinanceSmartChain]: RpcEnum.BinanceSmartChain,
  [NetworksValueEnum.Moonbeam]: RpcEnum.Moonbeam,
  [NetworksValueEnum.Tezos]: RpcEnum.Tezos
};
