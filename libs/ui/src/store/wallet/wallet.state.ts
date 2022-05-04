import { GasTokensMetadata } from '../../constants/gas-tokens-metadata';
import { NetworksNameEnum } from '../../enums/network.enum';
import { TokenType } from '../../types/token.type';
import { AccountInterface } from '../interfaces/account.interface';

export interface WalletRootState {
  wallet: WalletState;
}

export interface WalletState {
  accounts: AccountInterface[];
  selectedAccountPublicKeyHash: string;
  network: string;
  gasToken: TokenType;
  gasTokenBalance: string;
}

export const appInfoInitialState: WalletState = {
  accounts: [],
  selectedAccountPublicKeyHash: '',
  network: NetworksNameEnum.KlaytnMainnet,
  gasToken: GasTokensMetadata['Klaytn Mainnet'],
  gasTokenBalance: '0'
};
