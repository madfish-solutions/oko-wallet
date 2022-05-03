import { NetworksValueEnum } from '../../enums/network.enum';
import { AccountInterface } from '../interfaces/account.interface';

export interface WalletRootState {
  wallet: WalletState;
}

export type TokenType = {
  tokenSymbol: string;
  balance: number;
};

export interface WalletState {
  accounts: AccountInterface[];
  selectedAccountPublicKeyHash: string;
  network: NetworksValueEnum;
  token: TokenType;
}

export const appInfoInitialState: WalletState = {
  accounts: [],
  selectedAccountPublicKeyHash: '',
  network: NetworksValueEnum.KlaytnMainnet,
  token: {
    tokenSymbol: '',
    balance: 0
  }
};
