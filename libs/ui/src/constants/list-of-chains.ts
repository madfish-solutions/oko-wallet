import { NetworksNameEnum } from '../enums/network.enum';

export type ChainType = {
  id?: number | string;
  label: string;
  value: string;
};

export const ListOfChains: ChainType[] = [
  {
    id: 0,
    label: NetworksNameEnum.KlaytnMainnet,
    value: NetworksNameEnum.KlaytnMainnet
  },
  {
    id: 1,
    label: NetworksNameEnum.KlaytnBaobabTestnet,
    value: NetworksNameEnum.KlaytnBaobabTestnet
  },
  {
    id: 2,
    label: NetworksNameEnum.Ethereum,
    value: NetworksNameEnum.Ethereum
  },
  {
    id: 3,
    label: NetworksNameEnum.BinanceSmartChain,
    value: NetworksNameEnum.BinanceSmartChain
  },
  {
    id: 4,
    label: NetworksNameEnum.Moonbeam,
    value: NetworksNameEnum.Moonbeam
  },
  {
    id: 5,
    label: NetworksNameEnum.Tezos,
    value: NetworksNameEnum.Tezos
  }
];
