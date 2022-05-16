import { combineEpics } from 'redux-observable';
import { map, Observable, of, catchError, switchMap } from 'rxjs';
import { Action } from 'ts-action';
import { ofType } from 'ts-action-operators';

import { generateHdAccountByBlockchain$ } from '../../utils/generate-hd-account.util';
import { getGasTokenBalance$ } from '../../utils/token.utils';
import { withSelectedAccount, withSelectedNetwork } from '../../utils/wallet.util';
import { RootState } from '../store';
import { withActualAccountIndex } from '../utils/walle.utils';

import { generateHDAccountAction, loadGasTokenBalanceAction } from './wallet.actions';

const generateHDAccountEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(generateHDAccountAction.submit),
    withSelectedNetwork(state$),
    withActualAccountIndex(state$),
    switchMap(([[, network], accountIndex]) =>
      generateHdAccountByBlockchain$(network.blockchain, accountIndex).pipe(
        map(account => generateHDAccountAction.success(account)),
        catchError(error => of(generateHDAccountAction.fail(error)))
      )
    )
  );

const getGasTokenBalanceEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(loadGasTokenBalanceAction.submit),
    withSelectedAccount(state$),
    withSelectedNetwork(state$),
    switchMap(([[, { publicKeyHash }], network]) =>
      getGasTokenBalance$(network, publicKeyHash).pipe(
        map(balance => loadGasTokenBalanceAction.success(balance)),
        catchError(error => of(loadGasTokenBalanceAction.fail(error.message)))
      )
    )
  );

export const walletEpics = combineEpics(generateHDAccountEpic, getGasTokenBalanceEpic);
