import { createAction } from '@reduxjs/toolkit';

import { TokenMetadataInterface } from '../../interfaces/token';

export const addTokenMetadataAction = createAction<TokenMetadataInterface>('wallet/ADD_TOKEN_METADATA');
