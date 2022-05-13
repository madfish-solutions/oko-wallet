import { TezosToolkit } from '@taquito/taquito';
import { getDefaultProvider } from 'ethers';
import { from, map } from 'rxjs';

import { NetworksNameEnum } from '../enums/networks.enum';
import { NetworkInrerface } from '../types/networks.type';

import { convertUnits } from './convertUnits';

export const getGasTokenBalance$ = (network: NetworkInrerface, pkh: string) => {
  const { gasToken, rpcUrl, name: networkName } = network;

  const getConvertedBalancePure = (balance: number): string =>
    convertUnits(balance, gasToken.decimals)
      .decimalPlaces(gasToken.decimals ?? 6)
      .toFixed();

  if (networkName === NetworksNameEnum.Tezos) {
    // TODO: Delete later
    const tzAddress = 'tz1XstX8fYXPY5JNV6M2p1yLD6VNjX38YuQP';

    const tezosToolkit = new TezosToolkit(rpcUrl);

    return from(tezosToolkit.tz.getBalance(tzAddress)).pipe(
      map(balance => ({
        gasTokenBalance: getConvertedBalancePure(+balance),
        gasToken
      }))
    );
  }

  const provider = getDefaultProvider(rpcUrl);

  return from(provider.getBalance(pkh)).pipe(
    map(balance => ({
      gasTokenBalance: getConvertedBalancePure(+balance),
      gasToken
    }))
  );
};
