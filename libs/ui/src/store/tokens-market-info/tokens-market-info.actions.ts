import { TokenPriceInfoResponse } from '../../api/types';
import { createActions } from '../utils/action.utils';

export const addTokensPriceInfo = createActions<
  { chainId: string; tokenAddressesList: string[]; rpcUrl: string },
  { tokensPriceInfo: TokenPriceInfoResponse; gasTokenPriceInfo: TokenPriceInfoResponse; rpcUrl: string }
>('tokens_market_info/ADD_TOKENS_PRICE');
