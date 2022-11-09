import { IconNameEnum } from '../components/icon/icon-name.enum';
import { NetworkTypeEnum } from '../enums/network-type.enum';
import { NetworkChainIdsByNetworkType, NetworkInterface } from '../interfaces/network.interface';

import { MainnetRpcEnum, TestnetRpcEnum } from './rpc';

export const NETWORKS_DEFAULT_LIST: NetworkInterface[] = [
  {
    chainId: '8217',
    rpcUrl: MainnetRpcEnum.Klaytn,
    name: 'Klaytn Mainnet',
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
    chainId: '1001',
    rpcUrl: TestnetRpcEnum.KlaytnBaobab,
    name: 'Klaytn Baobab Testnet',
    gasTokenMetadata: {
      name: 'Klaytn Token',
      symbol: 'KLAY',
      decimals: 18,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png'
    },
    explorerUrl: 'https://baobab.scope.klaytn.com',
    networkType: NetworkTypeEnum.EVM,
    iconName: IconNameEnum.Klaytn
  },
  {
    chainId: '1',
    rpcUrl: MainnetRpcEnum.Ethereum,
    name: 'Ethereum Mainnet',
    gasTokenMetadata: {
      name: 'Ether Token',
      symbol: 'ETH',
      decimals: 18,
      thumbnailUri: ''
    },
    explorerUrl: 'https://etherscan.io',
    networkType: NetworkTypeEnum.EVM,
    iconName: IconNameEnum.Ethereum
  },
  {
    chainId: '4',
    rpcUrl: TestnetRpcEnum.EthereumRinkeby,
    name: 'Ethereum Rinkeby Testnet',
    gasTokenMetadata: {
      name: 'Ether Token',
      symbol: 'ETH',
      decimals: 18,
      thumbnailUri: ''
    },
    explorerUrl: 'https://rinkeby.etherscan.io',
    networkType: NetworkTypeEnum.EVM,
    iconName: IconNameEnum.Ethereum
  },
  {
    chainId: '3',
    rpcUrl: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    name: 'Ethereum Ropsten Testnet',
    gasTokenMetadata: {
      name: 'Ether Token',
      symbol: 'ETH',
      decimals: 18,
      thumbnailUri: ''
    },
    explorerUrl: 'https://ropsten.etherscan.io',
    networkType: NetworkTypeEnum.EVM,
    iconName: IconNameEnum.Ethereum
  },
  {
    chainId: '56',
    rpcUrl: MainnetRpcEnum.BinanceSmartChain,
    name: 'Binance Smart Chain',
    gasTokenMetadata: {
      name: 'Binance Coin',
      symbol: 'BNB',
      // TODO: Correct decimals are 8, but from RPC we get 18
      decimals: 18,
      thumbnailUri: ''
    },
    explorerUrl: 'https://bscscan.com',
    networkType: NetworkTypeEnum.EVM,
    iconName: IconNameEnum.BinanceSmartChain
  },
  {
    chainId: '97',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    name: 'BSC Testnet',
    gasTokenMetadata: {
      name: 'Binance Coin',
      symbol: 'BNB',
      // TODO: Correct decimals are 8, but from RPC we get 18
      decimals: 18,
      thumbnailUri: ''
    },
    explorerUrl: 'https://testnet.bscscan.com',
    networkType: NetworkTypeEnum.EVM
  },
  {
    chainId: '1284',
    rpcUrl: MainnetRpcEnum.Moonbeam,
    name: 'Moonbeam',
    gasTokenMetadata: {
      name: 'Moonbeam Token',
      symbol: 'GLMR',
      decimals: 9,
      thumbnailUri: ''
    },
    explorerUrl: 'https://moonbeam.moonscan.io',
    networkType: NetworkTypeEnum.EVM
  },
  {
    chainId: '1287',
    rpcUrl: 'https://rpc.api.moonbase.moonbeam.network',
    name: 'Moonbase Alpha Testnet',
    gasTokenMetadata: {
      name: 'Moonbeam Token Dev',
      symbol: 'DEV',
      decimals: 18,
      thumbnailUri: ''
    },
    explorerUrl: 'https://moonbase.moonscan.io',
    networkType: NetworkTypeEnum.EVM
  },
  {
    chainId: 'NetXdQprcVkpaWU',
    rpcUrl: MainnetRpcEnum.Tezos,
    name: 'Tezos Mainnet',
    gasTokenMetadata: {
      name: 'Tezos Token',
      symbol: 'Tezos',
      decimals: 6,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2011.png'
    },
    explorerUrl: 'https://tzkt.io',
    networkType: NetworkTypeEnum.Tezos
  },
  {
    chainId: 'NetXnHfVqm9iesp',
    rpcUrl: TestnetRpcEnum.TezosIthacanet,
    name: 'Tezos Ithacanet Testnet',
    gasTokenMetadata: {
      name: 'Tezos Token',
      symbol: 'Tezos',
      decimals: 6,
      thumbnailUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2011.png'
    },
    explorerUrl: 'https://ithacanet.tzkt.io',
    networkType: NetworkTypeEnum.Tezos
  }
];

export const DEFAULT_NETWORK_TYPE: NetworkTypeEnum = NetworkTypeEnum.EVM;

export enum TezosChainId {
  Mainnet = 'NetXdQprcVkpaWU',
  Ghostnet = 'NetXnHfVqm9iesp'
}

export const TEZOS_NETWORKS_LIST = [
  'https://mainnet-node.madfish.solutions',
  'https://mainnet.smartpy.io',
  'https://mainnet.api.tez.ie',
  'https://rpc.ghostnet.teztnets.xyz/',
  'https://rpc.kathmandunet.teztnets.xyz/',
  'https://ithacanet.smartpy.io',
  'https://rpczero.tzbeta.net',
  'https://kathmandunet.ecadinfra.com',
  'https://rpc.tzbeta.net/',
  'https://ghostnet.tezos.marigold.dev/'
];

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

export const tezosBlockExplorers = {
  [TezosChainId.Mainnet]: 'https://tzkt.io',
  [TezosChainId.Ghostnet]: 'https://ghostnet.tzkt.io/'
};
