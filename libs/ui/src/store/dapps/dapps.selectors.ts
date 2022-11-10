import { useSelector } from 'react-redux';

import { useSelectedAccountPublicKeyHashSelector } from '../wallet/wallet.selectors';

import { DappPayloadState, DappsRootState } from './dapps.state';

export const useAllDapps = () => useSelector<DappsRootState, Record<string, DappPayloadState>>(({ dapps }) => dapps);

export const useDappsByAddress = (): Record<string, DappPayloadState> => {
  const selectedAddress = useSelectedAccountPublicKeyHashSelector();

  const allDapps = useAllDapps();

  console.log(allDapps, 'all dapps');

  return Object.keys(allDapps).reduce((acc, dapp) => {
    if (allDapps[dapp].address === selectedAddress) {
      acc = { ...acc, [dapp]: allDapps[dapp] };
    }

    return acc;
  }, {});
};
