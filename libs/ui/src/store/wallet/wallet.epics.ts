import { combineEpics, Epic } from 'redux-observable';
import { catchError, map, Observable, of, switchMap, concatMap } from 'rxjs';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { getString } from '../../utils/get-string.utils';
import { getGasTokenBalance$, getTokenBalance$ } from '../../utils/token.utils';
import { withSelectedAccount, withSelectedNetwork, withSelectedPublicKeyHash } from '../../utils/wallet.util';
import { RootState } from '../store';
import { createEntity } from '../utils/entity.utils';

import { loadGasTokenBalanceAction, loadAccountTokenBalanceAction } from './wallet.actions';

const getGasTokenBalanceEpic: Epic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(loadGasTokenBalanceAction.submit),
    withSelectedAccount(state$),
    withSelectedNetwork(state$),
    switchMap(([[, { networksKeys }], network]) =>
      getGasTokenBalance$(network, getString(networksKeys[network.networkType]?.publicKeyHash)).pipe(
        map(balance => loadGasTokenBalanceAction.success(balance)),
        catchError(error => of(loadGasTokenBalanceAction.fail(error.message)))
      )
    )
  );

const getTokenBalanceEpic: Epic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(loadAccountTokenBalanceAction.submit),
    toPayload(),
    withSelectedPublicKeyHash(state$),
    withSelectedNetwork(state$),
    concatMap(([[{ token }, publicKeyHash], network]) =>
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

export const walletEpics = combineEpics(getGasTokenBalanceEpic, getTokenBalanceEpic);
