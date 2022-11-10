import { createAction } from '@reduxjs/toolkit';

import { DappPayloadState } from './dapps.state';

export const updateDappInfo = createAction<DappPayloadState>('background-script/UPDATE_DAPP_INFO');

export const deleteDapp = createAction<string>('background-script/DELETE_DAPP');
