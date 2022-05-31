import { TezosToolkit } from '@taquito/taquito';
import { from, map, Observable, switchMap } from 'rxjs';

import { TezosTokenTypeEnum } from '../../enums/tezos-token-type.enum';
import { NetworkInterface } from '../../interfaces/network.interface';
import { Token } from '../../interfaces/token.interface';

export const loadTezosGasTokenBalance$ = ({ rpcUrl }: NetworkInterface, publicKeyHash: string): Observable<string> => {
  const tezosToolkit = new TezosToolkit(rpcUrl);

  return from(tezosToolkit.tz.getBalance(publicKeyHash)).pipe(map(balance => balance.toString()));
};

export const loadTezosTokenBalance$ = (
  { rpcUrl }: NetworkInterface,
  publicKeyHash: string,
  { tokenAddress, tezosTokenId = '0', tezosTokenType }: Token
): Observable<string> => {
  const tezosToolkit = new TezosToolkit(rpcUrl);

  return from(tezosToolkit.contract.at(tokenAddress)).pipe(
    switchMap(contract => {
      if (tezosTokenType === TezosTokenTypeEnum.FA_1_2) {
        return contract.views.getBalance(publicKeyHash).read();
      } else {
        return from(contract.views.balance_of([{ owner: publicKeyHash, token_id: tezosTokenId }]).read()).pipe(
          map(response => response[0].balance.toString())
        );
      }
    })
  );
};
