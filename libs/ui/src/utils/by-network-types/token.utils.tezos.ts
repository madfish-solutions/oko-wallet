import { TezosToolkit } from '@taquito/taquito';
import { formatUnits } from 'ethers/lib/utils';
import { from, map, Observable, switchMap } from 'rxjs';

import { TezosTokenTypeEnum } from '../../enums/tezos-token-type.enum';
import { NetworkInterface } from '../../interfaces/network.interface';
import { TokenMetadata } from '../../interfaces/token-metadata.interface';

// TODO: Delete later
const tzAddress = 'tz1XstX8fYXPY5JNV6M2p1yLD6VNjX38YuQP';

export const loadTezosGasTokenBalance$ = (network: NetworkInterface): Observable<string> => {
  const {
    rpcUrl,
    gasTokenMetadata: { decimals }
  } = network;

  const tezosToolkit = new TezosToolkit(rpcUrl);

  return from(tezosToolkit.tz.getBalance(tzAddress)).pipe(map(balance => formatUnits(balance.toFixed(), decimals)));
};

export const loadTezosTokenBalance$ = (
  network: NetworkInterface,
  pkh: string,
  token: TokenMetadata
): Observable<string> => {
  const { rpcUrl } = network;
  const { tokenAddress, decimals, tokenId = '0', tokenType } = token;
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
};
