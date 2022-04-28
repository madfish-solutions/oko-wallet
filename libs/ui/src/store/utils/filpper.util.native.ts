import { Middleware } from '@reduxjs/toolkit';
import { isDefined } from '@rnw-community/shared';
import createDebugger from 'redux-flipper';

import { RootState } from '../create-store';

export const addFlipperDebugger = (epicMidleware: Array<Middleware<string, RootState>>) => {
  if (__DEV__ && !isDefined(process.env.JEST_WORKER_ID)) {
    return [...epicMidleware, createDebugger()];
  }

  return epicMidleware;
};
