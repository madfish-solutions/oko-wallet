import { createAction } from '@reduxjs/toolkit';

import { DappPayloadState } from './dapps.state';

export const updateDappInfo = createAction<DappPayloadState>('background-script/UPDATE_DAPP_INFO');
