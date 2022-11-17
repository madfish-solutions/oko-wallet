import { createAction } from '@reduxjs/toolkit';

interface DAppConnectionPayload {
  dAppOrigin: string;
  accountPublicKeyHash: string;
}

export const connectDAppAction = createAction<DAppConnectionPayload>('dApps/CONNECT_DAPP');
export const removeDAppConnectionAction = createAction<DAppConnectionPayload>('dApps/REMOVE_DAPP_CONNECTION');
