import { combineEpics } from 'redux-observable';
import { catchError, delay, map, Observable, of, switchMap } from 'rxjs';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { generateRandomBalanceValueAction } from './app-info.actions';

const generateRandomBalanceEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(generateRandomBalanceValueAction.submit),
    toPayload(),
    switchMap(number =>
      of(Math.random() * 99 + number).pipe(
        delay(100),
        map(number => generateRandomBalanceValueAction.success(number)),
        catchError(error => of(generateRandomBalanceValueAction.fail(error)))
      )
    )
  );

export const appInfoEpics = combineEpics(generateRandomBalanceEpic);
