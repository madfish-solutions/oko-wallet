import { RpcEnum, RpcUrl } from './rpc';

export enum NetworksNameEnum {
  KlaytnMainnet = 'Klaytn Mainnet',
  KlaytnBaobabTestnet = 'Baobab Testnet',
  Ethereum = 'Ethereum',
  BinanceSmartChain = 'Binace Smart Chain',
  Moonbeam = 'moonbeam',
  Tezos = 'Tezos'
}

export enum NetworksValueEnum {
  KlaytnMainnet = 'klaytnMainnet',
  KlaytnBaobabTestnet = 'klaytnBaobabTestnet',
  Ethereum = 'ethereum',
  BinanceSmartChain = 'binaceSmartChain',
  Moonbeam = 'moonbeam',
  Tezos = 'tezos'
}

enum BlockExplorerEnum {
  KlaytnScope = 'https://scope.klaytn.com/',
  Etherscan = 'https://etherscan.io',
  Bscscan = 'https://bscscan.com',
  Moonscan = 'https://moonbeam.moonscan.io/',
  Tzkt = 'https://tzkt.io/'
}

type NetworksType = {
  [key in NetworksValueEnum]: {
    chainId: number | string;
    rpc: RpcEnum;
    name: NetworksNameEnum;
    tokenSymbol: string;
    explorer?: BlockExplorerEnum;
  };
};

export const NETWORKS: NetworksType = {
  [NetworksValueEnum.KlaytnMainnet]: {
    chainId: 8217,
    rpc: RpcUrl.klaytnMainnet,
    name: NetworksNameEnum.KlaytnMainnet,
    tokenSymbol: 'KLAY',
    explorer: BlockExplorerEnum.KlaytnScope
  },
  [NetworksValueEnum.KlaytnBaobabTestnet]: {
    chainId: 1001,
    rpc: RpcUrl.klaytnBaobabTestnet,
    name: NetworksNameEnum.KlaytnBaobabTestnet,
    tokenSymbol: 'KLAY',
    explorer: BlockExplorerEnum.KlaytnScope
  },
  [NetworksValueEnum.Ethereum]: {
    chainId: 1,
    rpc: RpcUrl.ethereum,
    name: NetworksNameEnum.Ethereum,
    tokenSymbol: 'ETH',
    explorer: BlockExplorerEnum.Etherscan
  },
  [NetworksValueEnum.BinanceSmartChain]: {
    chainId: 56,
    rpc: RpcUrl.binaceSmartChain,
    name: NetworksNameEnum.BinanceSmartChain,
    tokenSymbol: 'BNB',
    explorer: BlockExplorerEnum.Bscscan
  },
  [NetworksValueEnum.Moonbeam]: {
    chainId: 1284,
    rpc: RpcUrl.moonbeam,
    name: NetworksNameEnum.Moonbeam,
    tokenSymbol: 'GLMR',
    explorer: BlockExplorerEnum.Moonscan
  },
  [NetworksValueEnum.Tezos]: {
    chainId: 'NetXdQprcVkpaWU',
    rpc: RpcUrl.tezos,
    name: NetworksNameEnum.Tezos,
    tokenSymbol: 'Tezos',
    explorer: BlockExplorerEnum.Tzkt
  }
};
