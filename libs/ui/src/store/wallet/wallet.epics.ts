import { combineEpics, Epic } from 'redux-observable';
import { catchError, map, Observable, of, switchMap, concatMap } from 'rxjs';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { ScreensEnum } from '../../enums/sreens.enum';
import { getGasTokenBalance$, getTokenBalance$ } from '../../utils/token.utils';
import { withSelectedAccount, withSelectedNetwork } from '../../utils/wallet.util';
import { navigateAction } from '../root-state.actions';
import { RootState } from '../store';
import { createEntity } from '../utils/entity.utils';

import { loadGasTokenBalanceAction, loadAccountTokenBalanceAction, sendAssetAction } from './wallet.actions';
import { getTransferParams$ } from './wallet.utils';

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

const sendAssetEpic: Epic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(sendAssetAction.submit),
    toPayload(),
    withSelectedNetwork(state$),
    switchMap(([sendAssetPayload, selectedNetwork]) =>
      getTransferParams$(sendAssetPayload, selectedNetwork).pipe(
        map(transferParams => navigateAction(ScreensEnum.SendConfirmation, { transferParams }))
      )
    )
  );

export const walletEpics = combineEpics(getGasTokenBalanceEpic, getTokenBalanceEpic, sendAssetEpic);
