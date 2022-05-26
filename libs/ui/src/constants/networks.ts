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

export const NETWORK_CHAIN_IDS_BY_NETWORK_TYPE: NetworkChainIdsByNetworkType = {
  [NetworkTypeEnum.Tezos]: {
    MAINNET: 'NetXdQprcVkpaWU',
    CARTHAGENET: 'NetXjD3HPJJjmcd',
    DELPHINET: 'NetXm8tYqnMWky1',
    EDONET: 'NetXSgo1ZT2DRUG',
    FLORENCENET: 'NetXxkAx4woPLyu',
    GRANADANET: 'NetXz969SFaFn8k',
    HANGZHOUNET: 'NetXZSsxBpMQeAT',
    ITHACANET: 'NetXbhmtAbMukLc',
    ITHACANET2: 'NetXnHfVqm9iesp',
    JAKARTANET2: 'NetXLH1uAxK7CCh'
  }
};
