import { NetworkGroupEnum } from '../enums/network-group.enum';
import { NetworkTypeEnum } from '../enums/network-type.enum';
import { NetworkChainIdsByNetworkGroup, NetworkInterface } from '../interfaces/network.interface';
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
    explorerUrl: 'https://scope.klaytn.com/'
  },
  {
    chainId: '1001',
    rpcUrl: 'https://api.baobab.klaytn.net:8651',
    name: 'Baobab Testnet',
    gasTokenMetadata: {
      name: 'Klaytn Token',
      symbol: 'KLAY',
      decimals: 18,
      thumbnailUri: ''
    },
    gasTokenBalance: createEntity('0'),
    explorerUrl: 'https://baobab.scope.klaytn.com/'
  },
  {
    chainId: '1',
    rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    name: 'Ethereum',
    gasTokenMetadata: {
      name: 'Ether Token',
      symbol: 'ETH',
      decimals: 18,
      thumbnailUri: ''
    },
    gasTokenBalance: createEntity('0'),
    explorerUrl: 'https://etherscan.io'
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
    explorerUrl: 'https://bscscan.com'
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
    explorerUrl: 'https://moonbeam.moonscan.io/'
  },
  {
    chainId: 'NetXdQprcVkpaWU',
    rpcUrl: 'https://mainnet-node.madfish.solutions',
    name: 'Tezos',
    gasTokenMetadata: {
      name: 'Tezos Token',
      symbol: 'Tezos',
      decimals: 6,
      thumbnailUri: ''
    },
    gasTokenBalance: createEntity('0'),
    explorerUrl: 'https://tzkt.io/'
  }
];

export const DEFAULT_NETWORK_TYPE: NetworkTypeEnum = NetworkTypeEnum.EVM;

export const NETWORK_CHAIN_IDS_BY_NETWORK_GROUP: NetworkChainIdsByNetworkGroup = {
  [NetworkGroupEnum.Tezos]: [
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
  ],
  [NetworkGroupEnum.Klaytn]: [
    '8217', //Klaytn mainnet
    '1001' //Baobab
  ],
  [NetworkGroupEnum.BSC]: [
    '56', //Smart Chain
    '97' //Smart Chain - Testnet
  ]
};

export const ETHERSCAN_SUPPORTED_NETWORKS_CHAIN_IDS = [
  '1', //homestead,
  '3', //ropsten,
  '4', //rinkeby
  '5', //goerli
  '42' //kovan
];
