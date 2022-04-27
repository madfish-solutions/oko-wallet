import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { combineEpics, createEpicMiddleware, Epic, StateObservable } from 'redux-observable';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistConfig } from 'redux-persist/lib/types';
import { Observable, catchError } from 'rxjs';
// TODO: Maybe use for 'web' version
// import storage from 'redux-persist/lib/storage';

import { rootStateReducer } from './root-state.reducers';
import { tokensReducers } from './tokens/tokens-reducers';
import { TokensRootState } from './tokens/tokens-state';
import { walletReducers } from './wallet/wallet-reducers';
import { WalletRootState } from './wallet/wallet-state';

export type RootState = WalletRootState & TokensRootState;

const epicMiddleware = createEpicMiddleware();
// eslint-disable-next-line @typescript-eslint/ban-types
const middlewares: Array<Middleware<{}, RootState>> = [epicMiddleware];

// TODO: Add 'redux-flipper' for dubugging
// if (__DEV__ && !isDefined(process.env.JEST_WORKER_ID)) {
//   middlewares.push(createDebugger());
// }

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  // TODO: Maybe add swap on 'storage' on web version
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2
};

export const rootReducer = rootStateReducer<RootState>({
  wallet: walletReducers,
  tokens: tokensReducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createStore = (...epics: Epic[]) => {
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
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }).concat(middlewares);
    }
  });

  const persistor = persistStore(store);

  epicMiddleware.run(rootEpic);

  return { store, persistor };
};
