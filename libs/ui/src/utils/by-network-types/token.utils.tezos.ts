import { from, map, Observable, switchMap } from 'rxjs';

import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { TezosTokenTypeEnum } from '../../enums/tezos-token-type.enum';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { Token } from '../../interfaces/token.interface';
import { convertUnits } from '../convert-units';
import { getString } from '../get-string.utils';
import { createReadOnlyTezosToolkit } from '../tezos-toolkit.utils';

export const loadTezosGasTokenBalance$ = (
  { rpcUrl, gasTokenMetadata: { decimals } }: NetworkInterface,
  account: AccountInterface
): Observable<string> => {
  const tezosToolkit = createReadOnlyTezosToolkit(rpcUrl, account);

  return from(tezosToolkit.tz.getBalance(getString(account.networksKeys[NetworkTypeEnum.Tezos]?.publicKeyHash))).pipe(
    map(balance => convertUnits(+balance, decimals).toString())
  );
};

export const loadTezosTokenBalance$ = (
  { rpcUrl }: NetworkInterface,
  account: AccountInterface,
  { tokenAddress, tokenId = '0', tezosTokenType }: Token
): Observable<string> => {
  const tezosToolkit = createReadOnlyTezosToolkit(rpcUrl, account);
  const publicKeyHash = getString(account.networksKeys[NetworkTypeEnum.Tezos]?.publicKeyHash);

  return from(tezosToolkit.contract.at(tokenAddress)).pipe(
    switchMap(contract => {
      if (tezosTokenType === TezosTokenTypeEnum.FA_1_2) {
        return contract.views.getBalance(publicKeyHash).read();
      }

      return from(contract.views.balance_of([{ owner: publicKeyHash, token_id: tokenId }]).read()).pipe(
        map(response => response[0].balance.toString())
      );
    })
  );
};
