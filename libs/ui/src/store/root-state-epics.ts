import { combineEpics } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from 'ts-action';
import { ofType } from 'ts-action-operators';

import { Shelter } from '../shelter/shelter';
import { resetStore$ } from '../utils/keychain.utils';

import { resetApplicationAction } from './root-state.actions';

const resetApplicationEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(resetApplicationAction.submit),
    switchMap(() => resetStore$()),
    map(() => {
      Shelter.lockApp();

      return resetApplicationAction.success();
    }),
    catchError(err => of(resetApplicationAction.fail(err.message)))
  );

export const rootStateEpics = combineEpics(resetApplicationEpic);
