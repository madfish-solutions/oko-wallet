import { Store } from 'redux';
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync';

import { IGNORED_ACTIONS } from '../constants/ignored-actions';

export const stateSyncMiddleware = createStateSyncMiddleware({ blacklist: IGNORED_ACTIONS });

export const initStateMessageListener = (store: Store) => initMessageListener(store);
