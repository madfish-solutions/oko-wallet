import { TezosToolkit } from '@taquito/taquito';
import { from, map, Observable, switchMap } from 'rxjs';

import { TezosTokenTypeEnum } from '../../enums/tezos-token-type.enum';
import { NetworkInterface } from '../../interfaces/network.interface';
import { TokenMetadata } from '../../interfaces/token-metadata.interface';

export const loadTezosGasTokenBalance$ = (network: NetworkInterface, publicKeyHash: string): Observable<string> => {
  const { rpcUrl } = network;

  const tezosToolkit = new TezosToolkit(rpcUrl);

  return from(tezosToolkit.tz.getBalance(publicKeyHash)).pipe(map(balance => balance.toString()));
};

export const loadTezosTokenBalance$ = (
  network: NetworkInterface,
  publicKeyHash: string,
  token: TokenMetadata
): Observable<string> => {
  const { rpcUrl } = network;
  const { tokenAddress, tokenId = '0', tokenType } = token;
  const tezosToolkit = new TezosToolkit(rpcUrl);

  return from(tezosToolkit.contract.at(tokenAddress)).pipe(
    switchMap(contract => {
      if (tokenType === TezosTokenTypeEnum.FA_1_2) {
        return contract.views.getBalance(publicKeyHash).read();
      } else {
        return from(contract.views.balance_of([{ owner: publicKeyHash, token_id: tokenId }]).read()).pipe(
          map(response => response[0].balance.toString())
        );
      }
    })
  );
};
