import { BlockExplorerEnum, NetworksNameEnum } from '../enums/networks.enum';
import { NetworksType } from '../types/networks.type';

import { GasTokensMetadata } from './gas-tokens-metadata';
import { RpcUrl } from './rpc';

export const NETWORKS: NetworksType = {
  [NetworksNameEnum.KlaytnMainnet]: {
    chainId: 8217,
    rpc: RpcUrl['Klaytn Mainnet'],
    name: 'Klaytn Mainnet',
    gasToken: GasTokensMetadata['Klaytn Mainnet'],
    explorer: BlockExplorerEnum.KlaytnScope
  },
  [NetworksNameEnum.KlaytnBaobabTestnet]: {
    chainId: 1001,
    rpc: RpcUrl['Baobab Testnet'],
    name: 'Baobab Testnet',
    gasToken: GasTokensMetadata['Baobab Testnet'],
    explorer: BlockExplorerEnum.KlaytnScope
  },
  [NetworksNameEnum.Ethereum]: {
    chainId: 1,
    rpc: RpcUrl.Ethereum,
    name: 'Ethereum',
    gasToken: GasTokensMetadata.Ethereum,
    explorer: BlockExplorerEnum.Etherscan
  },
  [NetworksNameEnum.BinanceSmartChain]: {
    chainId: 56,
    rpc: RpcUrl['Binance Smart Chain'],
    name: 'Binace Smart Chain',
    gasToken: GasTokensMetadata['Binance Smart Chain'],
    explorer: BlockExplorerEnum.Bscscan
  },
  [NetworksNameEnum.Moonbeam]: {
    chainId: 1284,
    rpc: RpcUrl.Moonbeam,
    name: 'Moonbeam',
    gasToken: GasTokensMetadata.Moonbeam,
    explorer: BlockExplorerEnum.Moonscan
  },
  [NetworksNameEnum.Tezos]: {
    chainId: 'NetXdQprcVkpaWU',
    rpc: RpcUrl.Tezos,
    name: 'Tezos',
    gasToken: GasTokensMetadata.Tezos,
    explorer: BlockExplorerEnum.Tzkt
  }
};
