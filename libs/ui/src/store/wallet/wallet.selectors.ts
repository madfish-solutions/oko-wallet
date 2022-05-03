import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { initialAccount } from '../../mocks/account.interface.mock';

import { WalletRootState, WalletState } from './wallet.state';

export const useSelectedAccount = () => {
  const wallet = useSelector<WalletRootState, WalletState>(({ wallet }) => wallet);

  return useMemo(
    () =>
      wallet.accounts.find(account => account.publicKeyHash === wallet.selectedAccountPublicKeyHash) ?? initialAccount,
    [wallet.selectedAccountPublicKeyHash]
  );
};
