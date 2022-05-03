import { useSelector } from 'react-redux';

import { WalletRootState, WalletState } from './wallet.state';

export const useSelectedAccountPkh = () =>
  useSelector<WalletRootState, WalletState['selectedAccountPublicKeyHash']>(
    ({ wallet }) => wallet.selectedAccountPublicKeyHash
  );
