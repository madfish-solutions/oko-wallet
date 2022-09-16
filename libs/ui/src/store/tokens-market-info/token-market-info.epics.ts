import { combineEpics, Epic } from 'redux-observable';
import { from, Observable, forkJoin } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { getTokensPriceInfo, getGasTokenPriceInfo } from '../../api/coin-gecko';

import { receiveTokensPriceInfo } from './tokens-market-info.actions';

const receiveTokensPriceInfoEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(receiveTokensPriceInfo.submit),
    toPayload(),
    concatMap(({ tokenAddressesList, chainId }) =>
      forkJoin([from(getTokensPriceInfo(chainId, tokenAddressesList)), from(getGasTokenPriceInfo(chainId))]).pipe(
        map(([tokensPriceInfo, gasTokenPriceInfo]) =>
          receiveTokensPriceInfo.success({ tokensPriceInfo, gasTokenPriceInfo, chainId })
        )
      )
    )
  );

export const tokenMarketInfoEpics = combineEpics(receiveTokensPriceInfoEpic);
