import { useSelector } from 'react-redux';

import { useSelectedAccountPublicKeyHashSelector } from '../wallet/wallet.selectors';

import { DAppState, DAppsRootState, emptyDAppState } from './d-apps.state';

export const useDAppSelector = (origin: string) =>
  useSelector<DAppsRootState, DAppState>(({ dApps }) => dApps[origin] ?? emptyDAppState);

export const useSelectedAccountDAppsListSelector = () => {
  const selectedAccountPublicKeyHash = useSelectedAccountPublicKeyHashSelector();

  return useSelector<DAppsRootState, DAppState[]>(({ dApps }) => {
    const dAppsList = Object.values(dApps);

    return dAppsList.filter(dApp => dApp.allowedAccounts.includes(selectedAccountPublicKeyHash));
  });
};
