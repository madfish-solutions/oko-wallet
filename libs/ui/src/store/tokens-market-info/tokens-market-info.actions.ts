import { TokensPriceInfoResponse } from '../../api/types';
import { createActions } from '../utils/action.utils';

export const loadTokensPriceInfo = createActions<
  { rpcUrl: string; chainId: string; tokenAddressesList: string[] },
  { rpcUrl: string; tokensPriceInfo: TokensPriceInfoResponse; gasTokenPriceInfo: TokensPriceInfoResponse }
>('tokens_market_info/LOAD_TOKENS_PRICE_INFO');
