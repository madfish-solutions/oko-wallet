import { BlockExplorerEnum, NetworksNameEnum, NetworksValueEnum } from '../enums/network.enum';
import { NetworksType } from '../types/networks.type';

import { GasTokensMetadata } from './gas-tokens-metadata';
import { RpcUrl } from './rpc';

export const NETWORKS: NetworksType = {
  [NetworksValueEnum.KlaytnMainnet]: {
    chainId: 8217,
    rpc: RpcUrl.klaytnMainnet,
    name: NetworksNameEnum.KlaytnMainnet,
    gasToken: GasTokensMetadata.klaytnMainnet,
    explorer: BlockExplorerEnum.KlaytnScope
  },
  [NetworksValueEnum.KlaytnBaobabTestnet]: {
    chainId: 1001,
    rpc: RpcUrl.klaytnBaobabTestnet,
    name: NetworksNameEnum.KlaytnBaobabTestnet,
    gasToken: GasTokensMetadata.klaytnBaobabTestnet,
    explorer: BlockExplorerEnum.KlaytnScope
  },
  [NetworksValueEnum.Ethereum]: {
    chainId: 1,
    rpc: RpcUrl.ethereum,
    name: NetworksNameEnum.Ethereum,
    gasToken: GasTokensMetadata.ethereum,
    explorer: BlockExplorerEnum.Etherscan
  },
  [NetworksValueEnum.BinanceSmartChain]: {
    chainId: 56,
    rpc: RpcUrl.binaceSmartChain,
    name: NetworksNameEnum.BinanceSmartChain,
    gasToken: GasTokensMetadata.binaceSmartChain,
    explorer: BlockExplorerEnum.Bscscan
  },
  [NetworksValueEnum.Moonbeam]: {
    chainId: 1284,
    rpc: RpcUrl.moonbeam,
    name: NetworksNameEnum.Moonbeam,
    gasToken: GasTokensMetadata.moonbeam,
    explorer: BlockExplorerEnum.Moonscan
  },
  [NetworksValueEnum.Tezos]: {
    chainId: 'NetXdQprcVkpaWU',
    rpc: RpcUrl.tezos,
    name: NetworksNameEnum.Tezos,
    gasToken: GasTokensMetadata.tezos,
    explorer: BlockExplorerEnum.Tzkt
  }
};
