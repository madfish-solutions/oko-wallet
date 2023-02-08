import { combineEpics } from 'redux-observable';
import { from, Observable, forkJoin } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { getTokensPriceInfo, getGasTokenPriceInfo } from '../../api/coin-gecko/coin-gecko';

import { loadTokensPriceInfo } from './tokens-market-info.actions';

const receiveTokensPriceInfoEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(loadTokensPriceInfo.submit),
    toPayload(),
    concatMap(({ tokenAddressesList, chainId }) =>
      forkJoin([from(getTokensPriceInfo(chainId, tokenAddressesList)), from(getGasTokenPriceInfo(chainId))]).pipe(
        map(([tokensPriceInfo, gasTokenPriceInfo]) =>
          loadTokensPriceInfo.success({ tokensPriceInfo, gasTokenPriceInfo, chainId })
        )
      )
    )
  );

export const tokenMarketInfoEpics = combineEpics(receiveTokensPriceInfoEpic);
