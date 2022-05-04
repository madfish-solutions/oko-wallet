import { combineEpics } from 'redux-observable';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from 'ts-action';
import { ofType } from 'ts-action-operators';

import { getGasTokenBalance$ } from '../../utils/get-gas-token-balance';
import { withSelectedAccount, withSelectedNetwork } from '../../utils/wallet.util';
import { RootState } from '../store';

import { getBalanceAction } from './wallet.actions';

const getGasTokenBalanceEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(getBalanceAction.submit),
    withSelectedAccount(state$),
    withSelectedNetwork(state$),
    switchMap(([[, { publicKeyHash }], network]) =>
      getGasTokenBalance$(network, publicKeyHash).pipe(
        map(({ gasToken, gasTokenBalance }) => getBalanceAction.success({ gasToken, gasTokenBalance })),
        catchError(error => of(getBalanceAction.fail(error)))
      )
    )
  );

export const walletEpics = combineEpics(getGasTokenBalanceEpic);
