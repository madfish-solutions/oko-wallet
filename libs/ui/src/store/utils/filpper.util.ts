import { Middleware } from '@reduxjs/toolkit';

import { RootState } from '../create-store';

export const addFlipperDebugger = (epicMidleware: Array<Middleware<string, RootState>>) => epicMidleware;
