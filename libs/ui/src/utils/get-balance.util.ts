import { getDefaultProvider } from 'ethers';
import { from, map } from 'rxjs';

import { NETWORKS } from '../constants/networks';
import { NetworksValueEnum } from '../enums/network.enum';

export const getBalance$ = (network: NetworksValueEnum, pkh: string) => {
  const currentNetwork = NETWORKS[network];
  const provider = getDefaultProvider(currentNetwork.rpc);

  return from(provider.getBalance(pkh)).pipe(
    map(balance => ({
      balance: +balance,
      tokenSymbol: currentNetwork.tokenSymbol
    }))
  );
};
