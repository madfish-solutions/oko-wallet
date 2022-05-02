export enum ListOfChainsEnum {
  Klaytn = 'Klaytn',
  BaobabTestnet = 'Baobab Testnet',
  ETH = 'Ethereum',
  BSC = 'Binace Smart Chain',
  Moonbeen = 'Moonbeen',
  Tezos = 'Tezos'
}

enum ListOfChainsValue {
  Klaytn = 'klaytn',
  BaobabTestnet = 'baobabTestnet',
  ETH = 'ethereum',
  BSC = 'binaceSmartChain',
  Moonbeen = 'moonbeen',
  Tezos = 'tezos'
}

export type ChainType = {
  id?: number | string;
  label: ListOfChainsEnum;
  value: ListOfChainsValue;
};

export const LIST_OF_CHAINS: ChainType[] = [
  {
    id: 0,
    label: ListOfChainsEnum.Klaytn,
    value: ListOfChainsValue.Klaytn
  },
  {
    id: 1,
    label: ListOfChainsEnum.BaobabTestnet,
    value: ListOfChainsValue.BaobabTestnet
  },
  {
    id: 2,
    label: ListOfChainsEnum.ETH,
    value: ListOfChainsValue.ETH
  },
  {
    id: 3,
    label: ListOfChainsEnum.BSC,
    value: ListOfChainsValue.BSC
  },
  {
    id: 4,
    label: ListOfChainsEnum.Moonbeen,
    value: ListOfChainsValue.Moonbeen
  },
  {
    id: 5,
    label: ListOfChainsEnum.Tezos,
    value: ListOfChainsValue.Tezos
  }
];
