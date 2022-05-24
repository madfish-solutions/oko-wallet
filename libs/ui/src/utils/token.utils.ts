import { TezosToolkit } from '@taquito/taquito';
import { Contract, getDefaultProvider } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { from, map, Observable, switchMap } from 'rxjs';

import genericErc20Abi from '../constants/erc20Abi.json';
import { SpecificNetworksEnum } from '../enums/specific-networks.enum';
import { TezosTokenTypeEnum } from '../enums/tezos-token-type.enum';
import { NetworkInterface } from '../interfaces/network.interface';
import { TokenMetadata } from '../interfaces/token-metadata.interface';

import { getSpecificNetworkId } from './network.util';

// TODO: Delete later
//const tzAddress = 'tz1XstX8fYXPY5JNV6M2p1yLD6VNjX38YuQP';
const tzAddress = 'tz1ikJViYJks7MhiDi2jjEddJzexzHHFA5no';

export const getGasTokenBalance$ = (network: NetworkInterface, pkh: string): Observable<string> => {
  const {
    rpcUrl,
    gasTokenMetadata: { decimals }
  } = network;

  const specificNetworkId = getSpecificNetworkId(rpcUrl);

  switch (specificNetworkId) {
    case SpecificNetworksEnum.TEZOS:
      const tezosToolkit = new TezosToolkit(rpcUrl);

      return from(tezosToolkit.tz.getBalance(tzAddress)).pipe(map(balance => formatUnits(balance.toFixed(), decimals)));
  }

  const provider = getDefaultProvider(rpcUrl);

  return from(provider.getBalance(pkh)).pipe(map(balance => formatUnits(balance, decimals)));
};

export const getTokenBalance$ = (network: NetworkInterface, pkh: string, token: TokenMetadata): Observable<string> => {
  const { rpcUrl } = network;
  const { tokenAddress, decimals, tokenId = '0', tokenType } = token;

  const specificNetworkId = getSpecificNetworkId(rpcUrl);

  switch (specificNetworkId) {
    case SpecificNetworksEnum.TEZOS:
      const tezosToolkit = new TezosToolkit(rpcUrl);

      return from(tezosToolkit.contract.at(tokenAddress)).pipe(
        switchMap(contract => {
          if (tokenType === TezosTokenTypeEnum.FA_1_2) {
            return contract.views.getBalance(tzAddress).read();
          } else {
            return from(contract.views.balance_of([{ owner: tzAddress, token_id: tokenId }]).read()).pipe(
              map(response => response[0].balance)
            );
          }
        }),
        map(balance => formatUnits(balance.toFixed(), decimals))
      );
  }

  const provider = getDefaultProvider(rpcUrl);
  const contract = new Contract(tokenAddress, genericErc20Abi, provider);

  return (from(contract.balanceOf(pkh)) as Observable<string>).pipe(map(balance => formatUnits(balance, decimals)));
};
