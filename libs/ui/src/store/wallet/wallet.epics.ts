import { combineEpics } from 'redux-observable';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, concatMap } from 'rxjs/operators';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { getAllUserNftList, getTokenList } from '../../api/debank';
import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { ScreensEnum } from '../../enums/sreens.enum';
import { parseTezosTransferParams } from '../../utils/parse-tezos-transfer-params.utils';
import { getGasTokenBalance$, getTokenBalance$ } from '../../utils/token.utils';
import { getEvmTransferParams$ } from '../../utils/transfer-params/get-evm-transfer-params.util';
import { getTezosTransferParams$ } from '../../utils/transfer-params/get-tezos-transfer-params.util';
import { withSelectedAccount, withSelectedNetwork } from '../../utils/wallet.util';
import { navigateAction } from '../root-state.actions';
import { RootState } from '../store';
import { createEntity } from '../utils/entity.utils';

import {
  loadGasTokenBalanceAction,
  loadAccountTokenBalanceAction,
  sendAssetAction,
  addNewTokensAction,
  getAllUserNftAction,
  deleteCollectibleAction
} from './wallet.actions';

const getGasTokenBalanceEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
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

const getTokenBalanceEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(loadAccountTokenBalanceAction.submit),
    toPayload(),
    withSelectedAccount(state$),
    withSelectedNetwork(state$),
    concatMap(([[{ token, deleteZeroBalance }, account], network]) =>
      getTokenBalance$(network, account, token).pipe(
        map(balance => {
          if (deleteZeroBalance === true && Number(balance) === 0) {
            return deleteCollectibleAction(token);
          }

          return loadAccountTokenBalanceAction.success({
            token: {
              ...token,
              balance: createEntity(balance)
            }
          });
        }),
        catchError(error => of(loadAccountTokenBalanceAction.fail({ token, error: error.message })))
      )
    )
  );

const sendAssetEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(sendAssetAction.submit),
    toPayload(),
    withSelectedNetwork(state$),
    withSelectedAccount(state$),
    switchMap(([[sendAssetPayload, selectedNetwork], sender]) => {
      if (selectedNetwork.networkType === NetworkTypeEnum.Tezos) {
        return getTezosTransferParams$(sendAssetPayload, selectedNetwork, sender).pipe(
          map(transferParams => parseTezosTransferParams(transferParams)),
          map(transferParams => ({ transferParams, asset: sendAssetPayload.asset }))
        );
      }

      return getEvmTransferParams$(sendAssetPayload);
    }),
    map(transferParams =>
      navigateAction(ScreensEnum.SendConfirmation, {
        transferParams
      })
    )
  );

const addNewTokensEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(addNewTokensAction.submit),
    toPayload(),
    concatMap(({ debankId, publicKeyHash }) =>
      from(getTokenList(publicKeyHash, debankId)).pipe(
        map(tokenList => addNewTokensAction.success({ tokenList, debankGasTokenName: debankId }))
      )
    )
  );

const getAllUserNftEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(getAllUserNftAction.submit),
    toPayload(),
    concatMap(({ debankId, publicKeyHash }) =>
      from(getAllUserNftList(publicKeyHash, debankId)).pipe(map(nftList => getAllUserNftAction.success({ nftList })))
    )
  );

export const walletEpics = combineEpics(
  getGasTokenBalanceEpic,
  getTokenBalanceEpic,
  sendAssetEpic,
  addNewTokensEpic,
  getAllUserNftEpic
);
