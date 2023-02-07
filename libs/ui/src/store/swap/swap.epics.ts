import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { combineEpics } from 'redux-observable';
import { Observable, of, from } from 'rxjs';
import { catchError, concatMap, debounceTime, map } from 'rxjs/operators';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { getQuote, getSwapData } from '../../api/1inch/1inch';
import { DEBOUNCE_TIME } from '../../constants/defaults';
import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { ScreensEnum } from '../../enums/sreens.enum';
import { Asset } from '../../interfaces/asset.interface';
import { withSelectedAccount, withSelectedNetwork } from '../../utils/wallet.util';
import { navigateAction } from '../root-state.actions';
import { RootState } from '../store';
import { getPublicKeyHash } from '../wallet/wallet.utils';

import { loadQuoteAction, loadSwapDataAction, loadTokenAllowanceAction } from './swap.actions';
import { loadTokenAllowance$ } from './swap.utils';

const getTokenAllowanceEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(loadTokenAllowanceAction.submit),
    toPayload(),
    withSelectedAccount(state$),
    withSelectedNetwork(state$),
    concatMap(([[tokenAddress, account], selectedNetwork]) =>
      loadTokenAllowance$(selectedNetwork.rpcUrl, getPublicKeyHash(account, NetworkTypeEnum.EVM), tokenAddress).pipe(
        map(allowance => loadTokenAllowanceAction.success(allowance.toString())),
        catchError(error => of(loadTokenAllowanceAction.fail(error)))
      )
    )
  );

const getQuoteEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(loadQuoteAction.submit),
    debounceTime(DEBOUNCE_TIME),
    toPayload(),
    withSelectedNetwork(state$),
    concatMap(([{ fromToken, toToken, amount }, selectedNetwork]) =>
      from(
        getQuote(selectedNetwork.chainId, fromToken, toToken, parseUnits(amount, fromToken.decimals).toString())
      ).pipe(
        map(response => loadQuoteAction.success({ ...response, fromToken, toToken })),
        catchError(error => of(loadQuoteAction.fail(error.response?.data?.description)))
      )
    )
  );

const getSwapDataEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(loadSwapDataAction.submit),
    toPayload(),
    withSelectedAccount(state$),
    withSelectedNetwork(state$),
    concatMap(([[{ fromToken, toToken, amount, slippageTolerance }, account], selectedNetwork]) =>
      from(
        getSwapData(
          selectedNetwork.chainId,
          getPublicKeyHash(account, NetworkTypeEnum.EVM),
          fromToken,
          toToken,
          parseUnits(amount, fromToken.decimals).toString(),
          slippageTolerance
        )
      ).pipe(
        concatMap(swapDataResponse => [
          navigateAction(ScreensEnum.SwapConfirmation, {
            transferParams: {
              receiverPublicKeyHash: swapDataResponse.to,
              value: amount,
              asset: fromToken as Asset,
              transactionParams: { ...swapDataResponse, value: BigNumber.from(swapDataResponse.value).toHexString() },
              gas: swapDataResponse.gasLimit
            }
          }),
          loadSwapDataAction.success()
        ]),
        catchError(error => of(loadSwapDataAction.fail(error.response?.data?.description)))
      )
    )
  );

export const swapEpics = combineEpics(getTokenAllowanceEpic, getQuoteEpic, getSwapDataEpic);
