import { combineEpics } from 'redux-observable';
import { map, Observable, of, catchError, switchMap, from } from 'rxjs';
import { Action } from 'ts-action';
import { ofType } from 'ts-action-operators';

import { mockHdAccount } from '../../mocks/account.interface.mock';
import { MOCK_HD_ACCOUNT } from '../../mocks/hd-account.mock';
import { getEtherDerivationPath } from '../../utils/derivation-path.utils';
import { generateHdAccount } from '../../utils/generate-hd-account.util';
import { AccountInterface } from '../interfaces/account.interface';
import { RootState } from '../store';
import { withActualAccountIndex } from '../utils/walle.utils';

import { generateHDAccountAction } from './wallet.actions';

const generateHDAccountEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(generateHDAccountAction.submit),
    withActualAccountIndex(state$),
    switchMap(([, index]) =>
      from(generateHdAccount(MOCK_HD_ACCOUNT.seed, getEtherDerivationPath(index))).pipe(
        map((hdAccount: any) => {
          const account: AccountInterface = {
            ...mockHdAccount,
            name: `Account ${index + 1}`,
            publicKeyHash: hdAccount.address,
            accountIndex: index
          };

          return generateHDAccountAction.success(account);
        }),
        catchError(error => of(generateHDAccountAction.fail(error)))
      )
    )
  );

export const walletEpics = combineEpics(generateHDAccountEpic);
