import { TokensPriceInfoResponse } from '../../api/coin-gecko/types';
import { createActions } from '../utils/action.utils';

export const loadTokensPriceInfo = createActions<
  { chainId: string; tokenAddressesList: string[] },
  { tokensPriceInfo: TokensPriceInfoResponse; gasTokenPriceInfo: TokensPriceInfoResponse; chainId: string }
>('tokens_market_info/LOAD_TOKENS_PRICE_INFO');
