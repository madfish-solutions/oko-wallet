import { useSelector } from 'react-redux';

import { useSelectedAccountPublicKeyHashSelector } from '../wallet/wallet.selectors';

import { DappPayloadState, DappsRootState } from './dapps.state';

export const useAllDappsSelector = () =>
  useSelector<DappsRootState, Record<string, DappPayloadState>>(({ dapps }) => dapps);

export const useDappsByAddressSelector = (): Record<string, DappPayloadState> => {
  const selectedAddress = useSelectedAccountPublicKeyHashSelector();

  const allDapps = useAllDappsSelector();

  return Object.keys(allDapps).reduce((acc, dapp) => {
    if (allDapps[dapp].address === selectedAddress) {
      acc = { ...acc, [dapp]: allDapps[dapp] };
    }

    return acc;
  }, {});
};
