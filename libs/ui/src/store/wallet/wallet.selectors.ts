import { useSelector } from 'react-redux';

import { WalletRootState, WalletState } from './wallet.state';

export const useSelectedAccount = () =>
  useSelector<WalletRootState, WalletState['accounts']>(({ wallet }) => wallet.accounts);
