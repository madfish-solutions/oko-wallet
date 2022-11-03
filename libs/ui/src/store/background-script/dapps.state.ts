export interface DappState {
  [name: string]: {
    logoUrl: string;
    chainId: string;
    address: string;
  };
}

export interface DappPayloadState {
  name: string;
  logoUrl: string;
  chainId: string;
  address: string;
}

export const DappsInitialState: DappState = {};
