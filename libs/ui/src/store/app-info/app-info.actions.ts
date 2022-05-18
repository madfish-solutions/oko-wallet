import { createAction } from '@reduxjs/toolkit';

export const unlockAppAction = createAction<boolean>('app-info/UNLOCK_APP');
