import { createAction } from '@reduxjs/toolkit';

import { NetworkInterface } from '../../interfaces/network.interface';
import { createActions } from '../utils/action.utils';

import { TokenMetadata, AccountTokenInfo } from './types';

export const generateHDAccount = createAction('wallet/GENERATE_HD_ACCOUNT');
export const loadGasTokenBalanceAction = createActions<void, string, string>('wallet/LOAD_GAS_TOKEN_BALANCE');

export const changeSelectedNetworkAction = createAction<string>('wallet/CHANGE_SELECTED_NETWORK');
export const addNewNetworkAction = createAction<NetworkInterface>('wallet/ADD_NEW_NETWORK');

export const addTokenMetadataAction = createAction<TokenMetadata>('wallet/ADD_TOKEN_METADATA');
export const changeTokenVisibilityAction = createAction<{
  tokenAddress: TokenMetadata['tokenAddress'];
  isVisible: AccountTokenInfo['isVisible'];
}>('wallet/CHANGE_TOKEN_VISIBILITY');
