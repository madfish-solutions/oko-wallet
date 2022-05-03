import { NetworksNameEnum, NetworksValueEnum } from '../enums/network.enum';

export type ChainType = {
  id?: number | string;
  label: NetworksNameEnum;
  value: NetworksValueEnum;
};

export const ListOfChains: ChainType[] = [
  {
    id: 0,
    label: NetworksNameEnum.KlaytnMainnet,
    value: NetworksValueEnum.KlaytnMainnet
  },
  {
    id: 1,
    label: NetworksNameEnum.KlaytnBaobabTestnet,
    value: NetworksValueEnum.KlaytnBaobabTestnet
  },
  {
    id: 2,
    label: NetworksNameEnum.Ethereum,
    value: NetworksValueEnum.Ethereum
  },
  {
    id: 3,
    label: NetworksNameEnum.BinanceSmartChain,
    value: NetworksValueEnum.BinanceSmartChain
  },
  {
    id: 4,
    label: NetworksNameEnum.Moonbeam,
    value: NetworksValueEnum.Moonbeam
  },
  {
    id: 5,
    label: NetworksNameEnum.Tezos,
    value: NetworksValueEnum.Tezos
  }
];
