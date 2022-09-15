import { combineEpics, Epic } from 'redux-observable';
import { from, Observable, forkJoin } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { getTokensPriceInfo, getGasTokenPriceInfo } from '../../api/coin-gecko';

import { addTokensPriceInfo } from './tokens-market-info.actions';

const addTokensPriceInfoEpic: Epic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(addTokensPriceInfo.submit),
    toPayload(),
    concatMap(({ tokenAddressesList, chainId, rpcUrl }) =>
      forkJoin([from(getTokensPriceInfo(chainId, tokenAddressesList)), from(getGasTokenPriceInfo(chainId))]).pipe(
        map(([tokensPriceInfo, gasTokenPriceInfo]) =>
          addTokensPriceInfo.success({ tokensPriceInfo, gasTokenPriceInfo, rpcUrl })
        )
      )
    )
  );

export const tokenMarketInfoEpics = combineEpics(addTokensPriceInfoEpic);
