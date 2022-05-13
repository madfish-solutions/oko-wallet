import { createAction } from '@reduxjs/toolkit';

import { NetworkType } from '../../types/networks.type';

export const changeNetworkAction = createAction<string>('settings/CHANGE_NETWORK');
export const addNewNetworkAction = createAction<NetworkType>('settings/ADD_NEW_NETWORK');
