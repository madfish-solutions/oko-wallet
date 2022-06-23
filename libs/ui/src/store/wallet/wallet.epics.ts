import { combineEpics, Epic } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, concatMap } from 'rxjs/operators';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { ScreensEnum } from '../../enums/sreens.enum';
import { getGasTokenBalance$, getTokenBalance$ } from '../../utils/token.utils';
import { getTezosTransferParams$ } from '../../utils/transfer-params/get-tezos-transfer-params.util';
import { withSelectedAccount, withSelectedNetwork } from '../../utils/wallet.util';
import { navigateAction } from '../root-state.actions';
import { RootState } from '../store';
import { createEntity } from '../utils/entity.utils';

import { loadGasTokenBalanceAction, loadAccountTokenBalanceAction, sendAssetAction } from './wallet.actions';

const getGasTokenBalanceEpic: Epic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(loadGasTokenBalanceAction.submit),
    withSelectedAccount(state$),
    withSelectedNetwork(state$),
    switchMap(([[, account], network]) =>
      getGasTokenBalance$(network, account).pipe(
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
    concatMap(([[{ token }, account], network]) =>
      getTokenBalance$(network, account, token).pipe(
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
    withSelectedAccount(state$),
    switchMap(([[sendAssetPayload, selectedNetwork], sender]) =>
      getTezosTransferParams$(sendAssetPayload, selectedNetwork, sender).pipe(
        map(transferParams => {
          console.log(transferParams);

          return navigateAction(ScreensEnum.SendConfirmation, {
            transferParams
          });
        })
      )
    )
  );

export const walletEpics = combineEpics(getGasTokenBalanceEpic, getTokenBalanceEpic, sendAssetEpic);
