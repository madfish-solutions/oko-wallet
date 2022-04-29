import { Middleware } from '@reduxjs/toolkit';

export const addFlipperDebugger = <S>(epicMidleware: Array<Middleware<string, S>>) => epicMidleware;
