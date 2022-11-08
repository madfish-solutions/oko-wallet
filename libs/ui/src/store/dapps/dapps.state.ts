export type DappState = Record<string, Omit<DappPayloadState, 'name'>>;
export interface DappPayloadState {
  name: string;
  logoUrl?: string;
  chainId?: string;
  address?: string;
}

export const DappsInitialState: DappState = {};

export interface DappsRootState {
  dapps: DappState;
  wallet: any;
}
