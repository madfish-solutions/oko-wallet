import { combineEpics } from 'redux-observable';
import { map, Observable } from 'rxjs';
import { Action } from 'ts-action';
import { ofType } from 'ts-action-operators';

import { getGasTokenBalanceAction } from '../wallet/wallet.actions';

import { changeNetworkAction } from './settings.actions';

const changeNetworkEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(changeNetworkAction),
    map(() => getGasTokenBalanceAction.submit())
  );

export const settingsEpics = combineEpics(changeNetworkEpic);
