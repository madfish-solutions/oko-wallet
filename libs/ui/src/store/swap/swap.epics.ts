import { parseUnits } from 'ethers/lib/utils';
import { combineEpics } from 'redux-observable';
import { Observable, of, from, switchMap } from 'rxjs';
import { catchError, concatMap, debounceTime, map } from 'rxjs/operators';
import { NetworkTypeEnum } from 'shared';
import { getDefaultEvmProvider } from 'shelter';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { getQuote, getSwapData } from '../../api/1inch/1inch';
import { DEBOUNCE_TIME } from '../../constants/defaults';
import { ScreensEnum } from '../../enums/sreens.enum';
import { OperationsEnum } from '../../screens/send-confirmation/enums';
import { getSwapExchangeRate } from '../../utils/get-swap-exchange-rate.util';
import { formatUnits } from '../../utils/units.utils';
import { withSelectedAccount, withSelectedNetwork } from '../../utils/wallet.util';
import { navigateAction } from '../root-state.actions';
import { RootState } from '../store';
import { getPublicKeyHash } from '../wallet/wallet.utils';

import {
  loadQuoteAction,
  loadSwapDataAction,
  loadTokenAllowanceAction,
  waitForApproveTxToBeSuccessAction
} from './swap.actions';
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
        concatMap(({ fromTokenAmount, toTokenAmount, ...swapData }) => [
          navigateAction(ScreensEnum.SendConfirmation, {
            transferParams: {
              receiverPublicKeyHash: swapData.to,
              value: amount,
              token: fromToken,
              transactionParams: swapData,
              internalSwapDetails: {
                toToken,
                toTokenAmount: formatUnits(toTokenAmount, toToken.decimals).toString(),
                exchangeRate: getSwapExchangeRate(fromToken, fromTokenAmount, toToken, toTokenAmount)
              },
              operation: OperationsEnum.InternalSwap,
              gas: swapData.gasLimit
            }
          }),
          loadSwapDataAction.success()
        ]),
        catchError(error => of(loadSwapDataAction.fail(error.response?.data?.description)))
      )
    )
  );

const waitForApproveTxToBeSuccessEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(waitForApproveTxToBeSuccessAction.submit),
    toPayload(),
    withSelectedNetwork(state$),
    switchMap(([{ token, txHash }, selectedNetwork]) =>
      from(getDefaultEvmProvider(selectedNetwork.rpcUrl).waitForTransaction(txHash, 1)).pipe(
        concatMap(() => [
          waitForApproveTxToBeSuccessAction.success(token.tokenAddress),
          loadTokenAllowanceAction.submit(token.tokenAddress)
        ]),
        catchError(() => of(waitForApproveTxToBeSuccessAction.success(token.tokenAddress)))
      )
    )
  );

export const swapEpics = combineEpics(
  getTokenAllowanceEpic,
  getQuoteEpic,
  getSwapDataEpic,
  waitForApproveTxToBeSuccessEpic
);
