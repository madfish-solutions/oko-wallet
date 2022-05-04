import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { initialAccount } from '../../mocks/account.interface.mock';
import { TokenWithEntityBalanceType } from '../../types/token.type';

import { WalletRootState, WalletState } from './wallet.state';

export const useSelectedAccountSelector = () => {
  const wallet = useSelector<WalletRootState, WalletState>(({ wallet }) => wallet);

  return useMemo(
    () =>
      wallet.accounts.find(account => account.publicKeyHash === wallet.selectedAccountPublicKeyHash) ?? initialAccount,
    [wallet.selectedAccountPublicKeyHash]
  );
};

export const useGetGasTokenDataSelector = () =>
  useSelector<WalletRootState, TokenWithEntityBalanceType>(({ wallet }) => ({
    gasToken: wallet.gasToken,
    gasTokenBalance: wallet.gasTokenBalance
  }));
