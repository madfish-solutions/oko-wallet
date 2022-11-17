import { createAction } from '@reduxjs/toolkit';

import { DAppInfo } from '../dapps.state';

export const updateDAppInfoAction = createAction<DAppInfo>('background-script/UPDATE_DAPP_INFO');
