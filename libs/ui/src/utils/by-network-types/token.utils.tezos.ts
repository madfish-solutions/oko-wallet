import { from, map, Observable, switchMap } from 'rxjs';

import { TezosTokenTypeEnum } from '../../enums/tezos-token-type.enum';
import { NetworkInterface } from '../../interfaces/network.interface';
import { Token } from '../../interfaces/token.interface';
import { createTezosToolkit } from '../tezos-toolkit.utils';

export const loadTezosGasTokenBalance$ = ({ rpcUrl }: NetworkInterface, publicKeyHash: string): Observable<string> => {
  const tezosToolkit = createTezosToolkit(rpcUrl);

  return from(tezosToolkit.tz.getBalance(publicKeyHash)).pipe(map(balance => balance.toString()));
};

export const loadTezosTokenBalance$ = (
  { rpcUrl }: NetworkInterface,
  publicKeyHash: string,
  { tokenAddress, tokenId = '0', tezosTokenType }: Token
): Observable<string> => {
  const tezosToolkit = createTezosToolkit(rpcUrl);

  return from(tezosToolkit.contract.at(tokenAddress)).pipe(
    switchMap(contract => {
      if (tezosTokenType === TezosTokenTypeEnum.FA_1_2) {
        return contract.views.getBalance(publicKeyHash).read();
      } else {
        return from(contract.views.balance_of([{ owner: publicKeyHash, token_id: tokenId }]).read()).pipe(
          map(response => response[0].balance.toString())
        );
      }
    })
  );
};
