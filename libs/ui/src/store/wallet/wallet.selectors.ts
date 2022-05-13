import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { initialAccount } from '../../mocks/account.interface.mock';

import { TokenMetadata, WalletRootState, WalletState } from './types';

export const useSelectedAccount = () => {
  const wallet = useSelector<WalletRootState, WalletState>(({ wallet }) => wallet);

  return useMemo(
    () =>
      wallet.accounts.find(account => account.publicKeyHash === wallet.selectedAccountPublicKeyHash) ?? initialAccount,
    [wallet.selectedAccountPublicKeyHash]
  );
};

export const useAllAccountTokens = () =>
  useSelector<WalletRootState, { tokenAddress: string; isVisible: boolean; url?: string; name: string }[]>(
    ({ wallet: { settings, selectedAccountPublicKeyHash, tokensMetadata, selectedNetwork } }) =>
      settings[selectedNetwork]?.[selectedAccountPublicKeyHash]?.map(({ tokenAddress, isVisible }) => {
        const { name, url } = tokensMetadata[selectedNetwork][tokenAddress];

        return {
          name,
          url,
          tokenAddress,
          isVisible
        };
      }) ?? []
  );

export const useVisibleAccountTokens = () => {
  return useSelector<WalletRootState, TokenMetadata[]>(
    ({ wallet: { tokensMetadata, settings, selectedAccountPublicKeyHash, selectedNetwork } }) =>
      settings[selectedNetwork]?.[selectedAccountPublicKeyHash]
        ?.filter(({ isVisible }) => isVisible)
        ?.map(({ tokenAddress }) => tokensMetadata[selectedNetwork][tokenAddress]) ?? []
  );
};
