export type DappState = Record<string, DappPayloadState>;
export interface DappPayloadState {
  name: string;
  logoUrl?: string;
  chainId?: string;
  address?: string;
}

export const DappsInitialState: DappState = {};

export interface DappsRootState {
  dapps: DappState;
}
