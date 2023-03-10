import { AccountInterface, AccountTypeEnum, NetworkTypeEnum } from 'shared';

import { Token, TokenFormType } from '../interfaces/token.interface';
import { createEntity } from '../store/utils/entity.utils';

export const EMPTY_STRING = '';

export const SINGLE_NFTS_KEY = 'single_nfts';

// all chains
export const CHAINS_JSON = 'https://chainid.network/chains.json';

// debounce time in milliseconds
export const DEBOUNCE_TIME = 300;

export const GAS_TOKEN_ADDRESS = 'gas_token_address';

export const SECURITY_TIME = 30000;

export const OVERLAY_SHOW_TIMEOUT = 10000;

export const EXTENSION_WIDTH = 360;

export const HIDE_SPLASH_SCREEN_TIMEOUT = 100;

export const FLOAT_ZERO_STRING = '0.0';

export const TOKEN_DOLLAR_VALUE_PLUG = '---';

export const EMPTY_TOKEN: Token = {
  tokenAddress: '',
  balance: createEntity('0'),
  decimals: 0,
  fiatBalance: 0,
  isVisible: true,
  name: '',
  symbol: ''
};

export const EMPTY_ACCOUNT: AccountInterface = {
  accountId: 9999,
  isVisible: true,
  name: 'Account 1',
  networksKeys: {
    [NetworkTypeEnum.EVM]: {
      publicKeyHash: 'empty_address',
      publicKey: 'empty_key'
    }
  },
  type: AccountTypeEnum.HD_ACCOUNT
};

export const EMPTY_METADATA: TokenFormType = {
  tokenAddress: '',
  name: '',
  symbol: '',
  decimals: '0',
  thumbnailUri: ''
};
