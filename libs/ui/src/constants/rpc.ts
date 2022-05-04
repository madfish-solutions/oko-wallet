import { NetworksNameEnum, RpcEnum } from '../enums/network.enum';

export const RpcUrl = {
  [NetworksNameEnum.KlaytnMainnet]: RpcEnum.KlaytnMainnet,
  [NetworksNameEnum.KlaytnBaobabTestnet]: RpcEnum.KlaytnBaobabTestnet,
  [NetworksNameEnum.Ethereum]: RpcEnum.Ethereum,
  [NetworksNameEnum.BinanceSmartChain]: RpcEnum.BinanceSmartChain,
  [NetworksNameEnum.Moonbeam]: RpcEnum.Moonbeam,
  [NetworksNameEnum.Tezos]: RpcEnum.Tezos
};
