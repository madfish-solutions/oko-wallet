import { NetworkTypeEnum } from 'shared';

import { IconNameEnum } from '../components/icon/icon-name.enum';
import { NetworkChainIdsByNetworkType, NetworkInterface } from '../interfaces/network.interface';

import { EvmChainId } from './chain-ids';
import { MainnetRpcEnum } from './rpc';

export const NETWORKS_DEFAULT_LIST: NetworkInterface[] = [
  {
    chainId: EvmChainId.Klaytn,
    rpcUrl: MainnetRpcEnum.Klaytn,
    name: 'Klaytn',
    gasTokenMetadata: {
      name: 'Klaytn Token',
      symbol: 'KLAY',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png'
    },
    explorerUrl: 'https://scope.klaytn.com',
    networkType: NetworkTypeEnum.EVM,
    iconName: IconNameEnum.Klaytn
  },
  {
    chainId: EvmChainId.BinanceSmartChain,
    rpcUrl: MainnetRpcEnum.BinanceSmartChain,
    name: 'Binance Smart Chain',
    gasTokenMetadata: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'
    },
    explorerUrl: 'https://bscscan.com',
    networkType: NetworkTypeEnum.EVM,
    iconName: IconNameEnum.BinanceSmartChain
  },
  {
    chainId: EvmChainId.Polygon,
    rpcUrl: MainnetRpcEnum.Polygon,
    name: 'Polygon',
    gasTokenMetadata: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png'
    },
    explorerUrl: 'https://polygonscan.com',
    networkType: NetworkTypeEnum.EVM,
    iconName: IconNameEnum.Polygon
  },
  {
    chainId: EvmChainId.Ethereum,
    rpcUrl: MainnetRpcEnum.Ethereum,
    name: 'Ethereum',
    gasTokenMetadata: {
      name: 'Ether Token',
      symbol: 'ETH',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
    },
    explorerUrl: 'https://etherscan.io',
    networkType: NetworkTypeEnum.EVM,
    iconName: IconNameEnum.Ethereum
  },
  {
    chainId: EvmChainId.Arbitrum,
    rpcUrl: MainnetRpcEnum.Arbitrum,
    name: 'Arbitrum',
    gasTokenMetadata: {
      name: 'Ether Token',
      symbol: 'ETH',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
    },
    explorerUrl: 'https://arbiscan.io',
    networkType: NetworkTypeEnum.EVM,
    iconName: IconNameEnum.Arbitrum
  },
  {
    chainId: EvmChainId.Avalanche,
    rpcUrl: MainnetRpcEnum.Avalanche,
    name: 'Avalanche',
    gasTokenMetadata: {
      name: 'Avalanche Token',
      symbol: 'AVAX',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png'
    },
    explorerUrl: 'https://snowtrace.io',
    networkType: NetworkTypeEnum.EVM,
    iconName: IconNameEnum.Avalanche
  },
  {
    chainId: EvmChainId.Optimism,
    rpcUrl: MainnetRpcEnum.Optimism,
    name: 'Optimism',
    gasTokenMetadata: {
      name: 'Ether Token',
      symbol: 'ETH',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
    },
    explorerUrl: 'https://optimistic.etherscan.io',
    networkType: NetworkTypeEnum.EVM,
    iconName: IconNameEnum.Optimism
  },
  {
    chainId: EvmChainId.Fantom,
    rpcUrl: MainnetRpcEnum.Fantom,
    name: 'Fantom',
    gasTokenMetadata: {
      name: 'Fantom Token',
      symbol: 'FTM',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png'
    },
    explorerUrl: 'https://ftmscan.com',
    networkType: NetworkTypeEnum.EVM,
    iconName: IconNameEnum.Fantom
  }
];

enum TezosChainId {
  Mainnet = 'NetXdQprcVkpaWU',
  Ghostnet = 'NetXnHfVqm9iesp'
}

export const NETWORK_CHAIN_IDS_BY_NETWORK_TYPE: NetworkChainIdsByNetworkType = {
  [NetworkTypeEnum.Tezos]: [
    TezosChainId.Mainnet,
    TezosChainId.Ghostnet,
    'NetXjD3HPJJjmcd',
    'NetXm8tYqnMWky1',
    'NetXSgo1ZT2DRUG',
    'NetXxkAx4woPLyu',
    'NetXz969SFaFn8k',
    'NetXZSsxBpMQeAT',
    'NetXbhmtAbMukLc',
    'NetXLH1uAxK7CCh'
  ],
  [NetworkTypeEnum.EVM]: []
};
