import { GasTokensMetadata } from '../../constants/gas-tokens-metadata';
import { NetworksValueEnum } from '../../enums/network.enum';
import { TokenType } from '../../types/token.type';
import { AccountInterface } from '../interfaces/account.interface';

export interface WalletRootState {
  wallet: WalletState;
}

export interface WalletState {
  accounts: AccountInterface[];
  selectedAccountPublicKeyHash: string;
  network: NetworksValueEnum;
  gasToken: TokenType;
  gasTokenBalance: string;
}

export const appInfoInitialState: WalletState = {
  accounts: [],
  selectedAccountPublicKeyHash: '',
  network: NetworksValueEnum.KlaytnMainnet,
  gasToken: GasTokensMetadata.klaytnMainnet,
  gasTokenBalance: '0'
};
