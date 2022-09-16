import { TokenPriceInfoResponse } from '../../api/types';
import { createActions } from '../utils/action.utils';

export const receiveTokensPriceInfo = createActions<
  { chainId: string; tokenAddressesList: string[] },
  { tokensPriceInfo: TokenPriceInfoResponse; gasTokenPriceInfo: TokenPriceInfoResponse; chainId: string }
>('tokens_market_info/ADD_TOKENS_PRICE');
