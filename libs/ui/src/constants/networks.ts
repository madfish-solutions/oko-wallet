import { NetworkTypeEnum } from '../enums/network-type.enum';
import { NetworkChainIdsByNetworkType, NetworkInterface } from '../interfaces/network.interface';
import { createEntity } from '../store/utils/entity.utils';

export const NETWORKS_DEFAULT_LIST: NetworkInterface[] = [
  {
    chainId: '8217',
    rpcUrl: 'https://public-node-api.klaytnapi.com/v1/cypress',
    name: 'Klaytn Mainnet',
    gasTokenMetadata: {
      name: 'Klaytn Token',
      symbol: 'KLAY',
      decimals: 18,
      thumbnailUri: ''
    },
    gasTokenBalance: createEntity('0'),
    explorerUrl: 'https://scope.klaytn.com/',
    networkType: NetworkTypeEnum.EVM
  },
  {
    chainId: '1001',
    rpcUrl: 'https://api.baobab.klaytn.net:8651',
    name: 'Klaytn Baobab Testnet',
    gasTokenMetadata: {
      name: 'Klaytn Token',
      symbol: 'KLAY',
      decimals: 18,
      thumbnailUri: ''
    },
    gasTokenBalance: createEntity('0'),
    explorerUrl: 'https://baobab.scope.klaytn.com/',
    networkType: NetworkTypeEnum.EVM
  },
  {
    chainId: '1',
    rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    name: 'Ethereum Mainnet',
    gasTokenMetadata: {
      name: 'Ether Token',
      symbol: 'ETH',
      decimals: 18,
      thumbnailUri: ''
    },
    gasTokenBalance: createEntity('0'),
    explorerUrl: 'https://etherscan.io/',
    networkType: NetworkTypeEnum.EVM
  },
  {
    chainId: '4',
    rpcUrl: 'https://rinkeby.infura.io/v3/6b0e2185e8a84c0c8106307118b22e29',
    name: 'Ethereum Rinkeby Testnet',
    gasTokenMetadata: {
      name: 'Ether Token',
      symbol: 'ETH',
      decimals: 18,
      thumbnailUri: ''
    },
    gasTokenBalance: createEntity('0'),
    explorerUrl: 'https://rinkeby.etherscan.io/',
    networkType: NetworkTypeEnum.EVM
  },
  {
    chainId: '56',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    name: 'Binance Smart Chain',
    gasTokenMetadata: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 8,
      thumbnailUri: ''
    },
    gasTokenBalance: createEntity('0'),
    explorerUrl: 'https://bscscan.com',
    networkType: NetworkTypeEnum.EVM
  },
  {
    chainId: '1284',
    rpcUrl: 'https://rpc.api.moonbeam.network',
    name: 'Moonbeam',
    gasTokenMetadata: {
      name: 'Moonbeam Token',
      symbol: 'GLMR',
      decimals: 9,
      thumbnailUri: ''
    },
    gasTokenBalance: createEntity('0'),
    explorerUrl: 'https://moonbeam.moonscan.io/',
    networkType: NetworkTypeEnum.EVM
  },
  {
    chainId: 'NetXdQprcVkpaWU',
    rpcUrl: 'https://mainnet-node.madfish.solutions',
    name: 'Tezos Mainnet',
    gasTokenMetadata: {
      name: 'Tezos Token',
      symbol: 'Tezos',
      decimals: 6,
      thumbnailUri: ''
    },
    gasTokenBalance: createEntity('0'),
    explorerUrl: 'https://tzkt.io/',
    networkType: NetworkTypeEnum.Tezos
  },
  {
    chainId: 'NetXnHfVqm9iesp',
    rpcUrl: 'https://ithacanet.ecadinfra.com/',
    name: 'Tezos Ithacanet Testnet',
    gasTokenMetadata: {
      name: 'Tezos Token',
      symbol: 'Tezos',
      decimals: 6,
      thumbnailUri: ''
    },
    gasTokenBalance: createEntity('0'),
    explorerUrl: 'https://ithacanet.tzkt.io/',
    networkType: NetworkTypeEnum.Tezos
  }
];

export const DEFAULT_NETWORK_TYPE: NetworkTypeEnum = NetworkTypeEnum.EVM;

export const NETWORK_CHAIN_IDS_BY_NETWORK_TYPE: NetworkChainIdsByNetworkType = {
  [NetworkTypeEnum.Tezos]: [
    'NetXdQprcVkpaWU',
    'NetXjD3HPJJjmcd',
    'NetXm8tYqnMWky1',
    'NetXSgo1ZT2DRUG',
    'NetXxkAx4woPLyu',
    'NetXz969SFaFn8k',
    'NetXZSsxBpMQeAT',
    'NetXbhmtAbMukLc',
    'NetXnHfVqm9iesp',
    'NetXLH1uAxK7CCh'
  ]
};
