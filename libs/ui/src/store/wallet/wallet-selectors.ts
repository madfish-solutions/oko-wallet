import { useSelector } from 'react-redux';

import { WalletRootState, WalletState } from './wallet-state';

export const useTokensMetadataSelector = () =>
  useSelector<WalletRootState, WalletState['tokensMetadata']>(({ wallet }) => wallet.tokensMetadata);
