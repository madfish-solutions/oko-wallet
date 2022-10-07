import { combineEpics } from 'redux-observable';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { globalNavigationRef } from '../components/navigator/navigator';
import { Shelter } from '../shelter/shelter';
import { resetStore$ } from '../utils/keychain.utils';

import { resetApplicationAction, untypedNavigateAction } from './root-state.actions';

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

const navigateEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(untypedNavigateAction),
    toPayload(),
    concatMap(navigationArgs => {
      // @ts-ignore
      globalNavigationRef.current?.navigate(...navigationArgs);

      return EMPTY;
    })
  );

export const rootStateEpics = combineEpics(resetApplicationEpic, navigateEpic);
