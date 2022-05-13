import { createAction } from '@reduxjs/toolkit';

import { TokenMetadata, AccountTokenInfo } from './types';

export const generateHDAccount = createAction('wallet/GENERATE_HD_ACCOUNT');
export const addTokenMetadataAction = createAction<TokenMetadata>('wallet/ADD_TOKEN_METADATA');
export const changeTokenVisibilityAction = createAction<{
  tokenAddress: TokenMetadata['tokenAddress'];
  isVisible: AccountTokenInfo['isVisible'];
}>('wallet/CHANGE_TOKEN_VISIBILITY');
