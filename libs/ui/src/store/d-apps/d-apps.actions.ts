import { createAction } from '@reduxjs/toolkit';

import { DAppInfo } from '../../interfaces/dapp-info.interface';

interface DAppConnectionPayload {
  dAppInfo: DAppInfo;
  accountPublicKeyHash: string;
}

export const connectDAppAction = createAction<DAppConnectionPayload>('dApps/CONNECT_DAPP');
export const removeDAppConnectionAction = createAction<DAppConnectionPayload>('dApps/REMOVE_DAPP_CONNECTION');
