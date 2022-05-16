import { NetworkInterface } from '../interfaces/network.interface';
import { createEntity } from '../store/utils/entity.utils';

export const NETWORKS_DEFAULT_LIST: NetworkInterface[] = [
  {
    chainId: '8217',
    rpcUrl: 'https://kaikas.cypress.klaytn.net:8651/',
    name: 'Klaytn Mainnet',
    gasTokenMetadata: {
      name: 'Klaytn Token',
      symbol: 'KLAY',
      decimals: 18,
      thumbnailUri: ''
    },
    gasTokenBalance: createEntity('0'),
    explorerUrl: 'https://scope.klaytn.com/',
    blockchain: 'Ethereum'
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
    explorerUrl: 'https://baobab.scope.klaytn.com/',
    blockchain: 'Ethereum'
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
    explorerUrl: 'https://etherscan.io',
    blockchain: 'Ethereum'
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
    blockchain: 'Ethereum'
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
    blockchain: 'Ethereum'
  },
  {
    chainId: 'NetXdQprcVkpaWU',
    rpcUrl: 'https://mainnet-tezos.giganode.io',
    name: 'Tezos',
    gasTokenMetadata: {
      name: 'Tezos Token',
      symbol: 'Tezos',
      decimals: 6,
      thumbnailUri: ''
    },
    gasTokenBalance: createEntity('0'),
    explorerUrl: 'https://tzkt.io/',
    blockchain: 'Tezos'
  }
];
