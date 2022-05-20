import { TezosToolkit } from '@taquito/taquito';
import { getDefaultProvider, Contract } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { from, map, switchMap, Observable } from 'rxjs';

import genericErc20Abi from '../constants/erc20Abi.json';
import { NetworkInterface } from '../interfaces/network.interface';
import { TokenMetadata } from '../interfaces/token-metadata.interface';

import { getSpecificNetworkId } from './network.util';

// TODO: Delete later
const tzAddress = 'tz1XstX8fYXPY5JNV6M2p1yLD6VNjX38YuQP';

export const getGasTokenBalance$ = (network: NetworkInterface, pkh: string): Observable<string> => {
  const {
    rpcUrl,
    gasTokenMetadata: { decimals }
  } = network;

  const specificNetworkId = getSpecificNetworkId(rpcUrl);

  switch (specificNetworkId) {
    case 'tezos':
      const tezosToolkit = new TezosToolkit(rpcUrl);

      return from(tezosToolkit.tz.getBalance(tzAddress)).pipe(map(balance => formatUnits(balance.toFixed(), decimals)));
  }

  const provider = getDefaultProvider(rpcUrl);

  return from(provider.getBalance(pkh)).pipe(map(balance => formatUnits(balance, decimals)));
};

export const getTokenBalance$ = (network: NetworkInterface, pkh: string, token: TokenMetadata): Observable<string> => {
  const { rpcUrl } = network;
  const { tokenAddress, decimals } = token;

  const specificNetworkId = getSpecificNetworkId(rpcUrl);

  switch (specificNetworkId) {
    case 'tezos':
      const tezosToolkit = new TezosToolkit(rpcUrl);

      return from(tezosToolkit.contract.at(tokenAddress)).pipe(
        switchMap(contract =>
          from(contract.views.balance_of([{ owner: tzAddress, token_id: '0' }]).read()).pipe(
            map(response => formatUnits(response[0].balance.toFixed(), decimals))
          )
        )
      );
  }

  const provider = getDefaultProvider(rpcUrl);
  const contract = new Contract(tokenAddress, genericErc20Abi, provider);

  return (from(contract.balanceOf(pkh)) as Observable<string>).pipe(map(balance => formatUnits(balance, decimals)));
};
