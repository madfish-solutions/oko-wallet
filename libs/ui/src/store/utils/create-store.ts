import { configureStore } from '@reduxjs/toolkit';
import { Action, AnyAction, Middleware, ReducersMapObject } from 'redux';
import { combineEpics, createEpicMiddleware, Epic, StateObservable } from 'redux-observable';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistConfig } from 'redux-persist/lib/types';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorage } from 'shared';

import { IGNORED_ACTIONS } from '../constants/ignored-actions';
import { rootStateReducer } from '../root-state.reducers';

import { addFlipperDebugger } from './filpper.util';
import { stateSyncMiddleware, initStateMessageListener } from './state-sync-middleware';

export const createStore = <S extends object, A extends Action = AnyAction>({
  reducers,
  epics
}: {
  reducers: ReducersMapObject<S, A>;
  epics: Epic[];
}) => {
  const epicMiddleware = createEpicMiddleware();
  const middlewares: Array<Middleware<string, S>> = addFlipperDebugger<S>([epicMiddleware]).concat(stateSyncMiddleware);

  const persistConfig: PersistConfig<S> = {
    key: 'root',
    version: 1,
    storage: LocalStorage,
    stateReconciler: autoMergeLevel2
  };

  const rootReducer = rootStateReducer<S, A>(reducers);

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rootEpic = (action$: Observable<any>, store$: StateObservable<any>, dependencies: any) =>
    combineEpics(...epics)(action$, store$, dependencies).pipe(
      catchError((error, source) => {
        console.error(error);

        return source;
      })
    );

  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: IGNORED_ACTIONS
        }
      }).concat(middlewares)
  });

  initStateMessageListener(store);

  const persistor = persistStore(store);

  epicMiddleware.run(rootEpic);

  return { store, persistor };
};
