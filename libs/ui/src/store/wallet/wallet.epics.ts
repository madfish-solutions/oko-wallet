import { combineEpics, Epic } from 'redux-observable';
import { catchError, map, Observable, of, switchMap, concatMap } from 'rxjs';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { loadActivity$ } from '../../utils/activity.utils';
import { getGasTokenBalance$, getTokenBalance$ } from '../../utils/token.utils';
import { withSelectedAccount, withSelectedNetwork } from '../../utils/wallet.util';
import { RootState } from '../store';
import { createEntity } from '../utils/entity.utils';

import { loadGasTokenBalanceAction, loadAccountTokenBalanceAction, loadActivityAction } from './wallet.actions';

const getGasTokenBalanceEpic: Epic = (action$: Observable<Action>, state$: Observable<RootState>) =>
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

const getTokenBalanceEpic: Epic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(loadAccountTokenBalanceAction.submit),
    toPayload(),
    withSelectedAccount(state$),
    withSelectedNetwork(state$),
    concatMap(([[{ token }, { publicKeyHash }], network]) =>
      getTokenBalance$(network, publicKeyHash, token).pipe(
        map(balance =>
          loadAccountTokenBalanceAction.success({
            token: {
              ...token,
              balance: createEntity(balance)
            }
          })
        ),
        catchError(error => of(loadAccountTokenBalanceAction.fail({ token, error: error.message })))
      )
    )
  );

const getActivityEpic: Epic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(loadActivityAction.submit),
    withSelectedAccount(state$),
    withSelectedNetwork(state$),
    switchMap(([[, { publicKeyHash }], network]) =>
      loadActivity$(network, publicKeyHash).pipe(
        map(activity => {
          console.log('Activity');
          console.log(activity);

          return loadActivityAction.success(activity);
        }),
        catchError(error => of(loadActivityAction.fail(error.message)))
      )
    )
  );

export const walletEpics = combineEpics(getGasTokenBalanceEpic, getTokenBalanceEpic, getActivityEpic);
