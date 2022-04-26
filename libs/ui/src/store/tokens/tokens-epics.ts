import { combineEpics } from "redux-observable";
import { EMPTY, Observable, switchMap } from "rxjs";
import { Action } from "ts-action";
import { ofType } from "ts-action-operators";

import { getTokensListAction } from "./tokens-actions";

const getTokensListEpic = (action$: Observable<Action>) =>
  action$.pipe(
    ofType(getTokensListAction),
    switchMap(() => EMPTY)
  );

export const tokensEpics = combineEpics(
  getTokensListEpic,
);
