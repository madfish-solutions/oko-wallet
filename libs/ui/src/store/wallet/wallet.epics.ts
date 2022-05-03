import { combineEpics } from 'redux-observable';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { getBalance$ } from '../../utils/get-balance.util';

import { getBalanceAction } from './wallet.actions';

const getBalanceEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(getBalanceAction.submit),
    toPayload(),
    switchMap(({ network, pkh }) =>
      from(getBalance$(network, pkh)).pipe(
        map(({ balance, tokenSymbol }) => getBalanceAction.success({ balance, tokenSymbol })),
        catchError(error => of(getBalanceAction.fail(error)))
      )
    )
  );

export const walletEpics = combineEpics(getBalanceEpic);
