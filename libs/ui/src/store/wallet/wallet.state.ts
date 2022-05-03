import { AccountInterface } from '../interfaces/account.interface';

export interface WalletRootState {
  wallet: WalletState;
}

export interface WalletState {
  accounts: AccountInterface[];
  selectedAccountPublicKeyHash: string;
}

export const appInfoInitialState: WalletState = {
  accounts: [],
  selectedAccountPublicKeyHash: ''
};
