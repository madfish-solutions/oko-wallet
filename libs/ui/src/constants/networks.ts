import { BlockExplorerEnum, NetworksNameEnum, NetworksValueEnum } from '../enums/network.enum';
import { NetworksType } from '../types/networks.type';

import { RpcUrl } from './rpc';

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
