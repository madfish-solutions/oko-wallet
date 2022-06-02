import { combineEpics } from 'redux-observable';
import { EMPTY, Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Action } from 'ts-action';
import { ofType, toPayload } from 'ts-action-operators';

import { navigationRef } from '../components/navigator/navigator';

import { untypedNavigateAction } from './root-state.actions';

const navigateEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(untypedNavigateAction),
    toPayload(),
    concatMap(navigationArgs => {
      navigationRef.current?.navigate(...navigationArgs);

      return EMPTY;
    })
  );

export const rootStateEpics = combineEpics(navigateEpic);
