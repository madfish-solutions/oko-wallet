import { BlockExplorerEnum } from '../enums/networks.enum';
import { NetworkInrerface } from '../types/networks.type';

import { GasTokensMetadata } from './gas-tokens-metadata';
import { RpcUrl } from './rpc';

export const NETWORKS: NetworkInrerface[] = [
  {
    chainId: '8217',
    rpcUrl: RpcUrl['Klaytn Mainnet'],
    name: 'Klaytn Mainnet',
    gasToken: GasTokensMetadata['Klaytn Mainnet'],
    explorerUrl: BlockExplorerEnum.KlaytnScope
  },
  {
    chainId: '1001',
    rpcUrl: RpcUrl['Baobab Testnet'],
    name: 'Baobab Testnet',
    gasToken: GasTokensMetadata['Baobab Testnet'],
    explorerUrl: BlockExplorerEnum.KlaytnScope
  },
  {
    chainId: '1',
    rpcUrl: RpcUrl.Ethereum,
    name: 'Ethereum',
    gasToken: GasTokensMetadata.Ethereum,
    explorerUrl: BlockExplorerEnum.Etherscan
  },
  {
    chainId: '56',
    rpcUrl: RpcUrl['Binance Smart Chain'],
    name: 'Binance Smart Chain',
    gasToken: GasTokensMetadata['Binance Smart Chain'],
    explorerUrl: BlockExplorerEnum.Bscscan
  },
  {
    chainId: '1284',
    rpcUrl: RpcUrl.Moonbeam,
    name: 'Moonbeam',
    gasToken: GasTokensMetadata.Moonbeam,
    explorerUrl: BlockExplorerEnum.Moonscan
  },
  {
    chainId: 'NetXdQprcVkpaWU',
    rpcUrl: RpcUrl.Tezos,
    name: 'Tezos',
    gasToken: GasTokensMetadata.Tezos,
    explorerUrl: BlockExplorerEnum.Tzkt
  }
];
