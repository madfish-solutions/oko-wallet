interface Explorer {
  name: string;
  standard: string;
  url: string;
}

interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export type NativeCurrencyType = {
  tokenName: string;
  decimals: number;
  thumbnailUri?: string;
};

export interface ChainInterface {
  chain: string;
  chainId: number;
  ens?: { registry: string };
  explorers?: Explorer[];
  faucets: string[];
  icon?: string;
  infoURL: string;
  name: string;
  nativeCurrency: NativeCurrency;
  networkId: number;
  rpc: string[];
  shortName: string;
  slip44?: number;
}
