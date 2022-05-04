import { createAction } from '@reduxjs/toolkit';

export const changeNetworkAction = createAction<string>('settings/CHANGE_NETWORK');
