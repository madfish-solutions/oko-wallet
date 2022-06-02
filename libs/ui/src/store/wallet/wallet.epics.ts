import { combineEpics } from 'redux-observable';
import { map, Observable, of, catchError, switchMap } from 'rxjs';
import { Action } from 'ts-action';
import { ofType } from 'ts-action-operators';

import { getGasTokenBalance$ } from '../../utils/token.utils';
import { withSelectedAccount, withSelectedNetwork, withSelectedNetworkType } from '../../utils/wallet.util';
import { RootState } from '../store';

import { loadGasTokenBalanceAction } from './wallet.actions';

const getGasTokenBalanceEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(loadGasTokenBalanceAction.submit),
    withSelectedAccount(state$),
    withSelectedNetwork(state$),
    withSelectedNetworkType(state$),
    switchMap(([[[, { networksKeys }], network], networkType]) =>
      getGasTokenBalance$(network, networksKeys[networkType].publicKeyHash).pipe(
        map(balance => loadGasTokenBalanceAction.success(balance)),
        catchError(error => of(loadGasTokenBalanceAction.fail(error.message)))
      )
    )
  );

export const walletEpics = combineEpics(getGasTokenBalanceEpic);
