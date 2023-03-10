import { combineEpics } from 'redux-observable';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, withLatestFrom, filter } from 'rxjs/operators';
import { resetStore$, Shelter } from 'shelter';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { globalNavigationRef } from '../components/navigator/navigator';

import { resetApplicationAction, resetKeychainOnInstallAction, untypedNavigateAction } from './root-state.actions';
import { RootState } from './store';

const resetKeychainOnInstallEpic = (action$: Observable<Action>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(resetKeychainOnInstallAction.submit),
    withLatestFrom(state$, (_, state) => state.settings.isFirstAppLaunch),
    filter(isFirstAppLaunch => isFirstAppLaunch),
    switchMap(() => resetStore$()),
    map(() => resetKeychainOnInstallAction.success()),
    catchError(err => of(resetKeychainOnInstallAction.fail(err.message)))
  );

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

export const rootStateEpics = combineEpics(resetApplicationEpic, navigateEpic, resetKeychainOnInstallEpic);
