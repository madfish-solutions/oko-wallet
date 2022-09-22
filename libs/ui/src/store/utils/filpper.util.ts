import { Middleware } from '@reduxjs/toolkit';

export const addFlipperDebugger = <S>(epicMiddleware: Array<Middleware<string, S>>) => epicMiddleware;
