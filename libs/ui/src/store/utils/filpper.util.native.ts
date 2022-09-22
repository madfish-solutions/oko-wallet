import { Middleware } from '@reduxjs/toolkit';
import { isDefined } from '@rnw-community/shared';
import createDebugger from 'redux-flipper';

export const addFlipperDebugger = <S>(epicMiddleware: Array<Middleware<string, S>>) => {
  if (__DEV__ && !isDefined(process.env.JEST_WORKER_ID)) {
    return [...epicMiddleware, createDebugger()];
  }

  return epicMiddleware;
};
