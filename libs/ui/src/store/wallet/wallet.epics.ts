import { combineEpics, Epic } from 'redux-observable';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, concatMap } from 'rxjs/operators';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { getAllUserNftList, getTokenInfo, getTokenList } from '../../api/debank';
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
  loadTokenMetadataAction,
  addNewTokenAction,
  addNewTokensAction,
  getAllUserNftAction
} from './wallet.actions';

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
    switchMap(([[sendAssetPayload, selectedNetwork], sender]) => {
      if (selectedNetwork.networkType === NetworkTypeEnum.Tezos) {
        return getTezosTransferParams$(sendAssetPayload, selectedNetwork, sender).pipe(
          map(transferParams => parseTezosTransferParams(transferParams))
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

const saveNewTokenEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(loadTokenMetadataAction),
    toPayload(),
    concatMap(({ tokenId, chainName }) =>
      from(getTokenInfo(tokenId, chainName)).pipe(
        map(result => addNewTokenAction({ ...result, tokenAddress: result.id })),
        catchError(error => of(console.log(error)))
      )
    )
  );

const addNewTokensEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(addNewTokensAction.submit),
    toPayload(),
    concatMap(({ debankId, publicKeyHash }) =>
      from(getTokenList(publicKeyHash, debankId)).pipe(
        map(tokenList => addNewTokensAction.success({ tokenList, debankGasTokenName: debankId }))
      )
    )
  );

const getAllUserNftEpic: Epic = (action$: Observable<Action>) =>
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
  saveNewTokenEpic,
  addNewTokensEpic,
  getAllUserNftEpic
);
