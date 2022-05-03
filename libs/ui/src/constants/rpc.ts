import { NetworksValueEnum, RpcEnum } from '../enums/network.enum';

export const RpcUrl = {
  [NetworksValueEnum.KlaytnMainnet]: RpcEnum.KlaytnMainnet,
  [NetworksValueEnum.KlaytnBaobabTestnet]: RpcEnum.KlaytnBaobabTestnet,
  [NetworksValueEnum.Ethereum]: RpcEnum.Ethereum,
  [NetworksValueEnum.BinanceSmartChain]: RpcEnum.BinanceSmartChain,
  [NetworksValueEnum.Moonbeam]: RpcEnum.Moonbeam,
  [NetworksValueEnum.Tezos]: RpcEnum.Tezos
};
