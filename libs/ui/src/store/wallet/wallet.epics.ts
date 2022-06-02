import { combineEpics } from 'redux-observable';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { ScreensEnum } from '../../enums/sreens.enum';
import { getGasTokenBalance$ } from '../../utils/token.utils';
import { withSelectedAccount, withSelectedNetwork } from '../../utils/wallet.util';
import { navigateAction } from '../root-state.actions';
import { RootState } from '../store';

import { loadGasTokenBalanceAction, sendAssetAction } from './wallet.actions';
import { getTransferParams$ } from './wallet.utils';

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

const sendAssetEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
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

export const walletEpics = combineEpics(getGasTokenBalanceEpic, sendAssetEpic);
