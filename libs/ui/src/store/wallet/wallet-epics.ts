import { combineEpics } from 'redux-observable';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { Action } from 'ts-action';
import { ofType } from 'ts-action-operators';

import { addTokenMetadataAction } from './wallet-actions';

// Example of Epic (without side effects, useless code)
const addTokenMetadataEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(addTokenMetadataAction),
    switchMap(() => EMPTY)
  );

export const walletEpics = combineEpics(addTokenMetadataEpic);
