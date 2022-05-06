import { getDefaultProvider } from 'ethers';
import { from, map } from 'rxjs';

import { NetworksNameEnum } from '../enums/networks.enum';
import { NetworkType } from '../types/networks.type';

import { convertUnits } from './convertUnits';
import { readOnlySignerAccount } from './read-only.signer.util';
import { createReadOnlyTezosToolkit } from './rpc/tezos-toolkit.utils';

export const getGasTokenBalance$ = (network: NetworkType, pkh: string) => {
  const { gasToken, rpc, name: networkName } = network;

  const getConvertedBalancePure = (balance: number): string =>
    convertUnits(balance, gasToken.decimals)
      .decimalPlaces(gasToken.decimals ?? 6)
      .toFixed();

  if (networkName === NetworksNameEnum.Tezos) {
    // TODO: Delete later
    const tzAddress = 'tz1XstX8fYXPY5JNV6M2p1yLD6VNjX38YuQP';

    return from(createReadOnlyTezosToolkit(rpc, readOnlySignerAccount).tz.getBalance(tzAddress)).pipe(
      map(balance => ({
        gasTokenBalance: getConvertedBalancePure(+balance),
        gasToken
      }))
    );
  }

  const provider = getDefaultProvider(rpc);

  return from(provider.getBalance(pkh)).pipe(
    map(balance => ({
      gasTokenBalance: getConvertedBalancePure(+balance),
      gasToken
    }))
  );
};
