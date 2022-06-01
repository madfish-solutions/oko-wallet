import { createAction } from '@reduxjs/toolkit';

import { AccountToken } from '../../interfaces/account-token.interface';
import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';
import { TokenMetadata } from '../../interfaces/token-metadata.interface';
import { createActions } from '../utils/action.utils';

export const setSelectedAccountAction = createAction<string>('wallet/SET_SELECTED_ACCOUNT');
export const addHdAccountAction = createAction<AccountInterface>('wallet/ADD_HD_ACCOUNT');

export const generateHDAccountAction = createAction('wallet/GENERATE_HD_ACCOUNT');
export const loadGasTokenBalanceAction = createActions<void, string, string>('wallet/LOAD_GAS_TOKEN_BALANCE');

export const changeSelectedNetworkAction = createAction<string>('wallet/CHANGE_SELECTED_NETWORK');
export const addNewNetworkAction = createAction<NetworkInterface>('wallet/ADD_NEW_NETWORK');

export const addTokenMetadataAction = createAction<TokenMetadata>('wallet/ADD_TOKEN_METADATA');
export const changeTokenVisibilityAction = createAction<AccountToken['tokenAddress']>('wallet/CHANGE_TOKEN_VISIBILITY');

export const switchAccountAction = createAction<string>('wallet/SWITCH_ACCOUNT');
