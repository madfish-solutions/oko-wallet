import { appInfoEpics } from './app-info/app-info.epics';
import { appInfoReducers } from './app-info/app-info.reducers';
import { AppInfoRootState } from './app-info/app-info.state';
import { createStore } from './utils/create-store';

export type RootState = AppInfoRootState;

export const { store, persistor } = createStore<RootState>({
  reducers: {
    appInfo: appInfoReducers
  },
  epics: [appInfoEpics]
});
