import { combineEpics } from 'redux-observable';
import { map, Observable, of, catchError, switchMap } from 'rxjs';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { generateHdAccountByBlockchain$, generateNewNetworkTypeInAccount$ } from '../../utils/generate-hd-account.util';
import { getGasTokenBalance$ } from '../../utils/token.utils';
import {
  withSelectedAccount,
  withSelectedAccountIndex,
  withSelectedNetwork,
  withSelectedNetworkType
} from '../../utils/wallet.util';
import { RootState } from '../store';
import { withActualAccountIndex } from '../utils/walle.utils';

import {
  changeAccountAndGenerateHdAccountByNetworkTypeAction,
  changeNetworkAndGenerateHdAccountByNetworkTypeAction,
  generateHDAccountAction,
  loadGasTokenBalanceAction
} from './wallet.actions';

const generateHDAccountEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(generateHDAccountAction.submit),
    withSelectedNetwork(state$),
    withActualAccountIndex(state$),
    switchMap(([[, network], accountIndex]) =>
      generateHdAccountByBlockchain$(network.networkType, accountIndex).pipe(
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
    withSelectedNetworkType(state$),
    switchMap(([[[, { networks }], network], networkType]) =>
      getGasTokenBalance$(network, networks[networkType].publicKeyHash).pipe(
        map(balance => loadGasTokenBalanceAction.success(balance)),
        catchError(error => of(loadGasTokenBalanceAction.fail(error.message)))
      )
    )
  );

const changeSelectedNetworkAndCreateNetworkTypeByAccountEpic = (
  action$: Observable<Action>,
  state$: Observable<RootState>
) =>
  action$.pipe(
    ofType(changeNetworkAndGenerateHdAccountByNetworkTypeAction.submit),
    withSelectedNetwork(state$),
    withSelectedAccountIndex(state$),
    switchMap(([[, network], accountIndex]) =>
      generateHdAccountByBlockchain$(network.networkType, accountIndex).pipe(
        map(account => changeNetworkAndGenerateHdAccountByNetworkTypeAction.success(account)),
        catchError(error => of(changeNetworkAndGenerateHdAccountByNetworkTypeAction.fail(error.message)))
      )
    )
  );

const changeAccountAndCreateNewNetworkTypeEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(changeAccountAndGenerateHdAccountByNetworkTypeAction.submit),
    toPayload(),
    map(account => account),
    withSelectedNetwork(state$),
    switchMap(([account, network]) =>
      generateNewNetworkTypeInAccount$(network.networkType, account).pipe(
        map(account => changeAccountAndGenerateHdAccountByNetworkTypeAction.success(account)),
        catchError(error => of(changeAccountAndGenerateHdAccountByNetworkTypeAction.fail(error.message)))
      )
    )
  );

export const walletEpics = combineEpics(
  generateHDAccountEpic,
  getGasTokenBalanceEpic,
  changeSelectedNetworkAndCreateNetworkTypeByAccountEpic,
  changeAccountAndCreateNewNetworkTypeEpic
);
