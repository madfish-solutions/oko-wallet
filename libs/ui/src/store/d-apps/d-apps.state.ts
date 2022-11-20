export type DAppsState = Record<string, DAppState>;

export interface DAppInfo {
  name: string;
  favicon: string;
  origin: string;
}

export interface DAppState extends DAppInfo {
  allowedAccounts: string[];
}
export const emptyDAppState: DAppState = {
  name: 'Unknown DApp',
  favicon: '',
  origin: 'https://unknown.dapp',
  allowedAccounts: []
};

export const dAppsInitialState: DAppsState = {};

export interface DAppsRootState {
  dApps: DAppsState;
}
