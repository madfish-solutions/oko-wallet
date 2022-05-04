import { getDefaultProvider } from 'ethers';
import { from, map } from 'rxjs';

import { NETWORKS } from '../constants/networks';

import { convertUnits } from './convertUnits';

export const getGasTokenBalance$ = (network: string, pkh: string) => {
  const { gasToken, rpc } = NETWORKS[network];
  const provider = getDefaultProvider(rpc);

  return from(provider.getBalance(pkh)).pipe(
    map(balance => ({
      gasTokenBalance: convertUnits(+balance, gasToken.decimals)
        .decimalPlaces(gasToken.decimals ?? 6)
        .toFixed(),
      gasToken
    }))
  );
};
