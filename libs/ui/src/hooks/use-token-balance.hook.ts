import { isDefined } from '@rnw-community/shared';
import { BigNumber } from 'bignumber.js';

import { GAS_TOKEN_ADDRESS } from '../constants/defaults';
import { useTokensMarketInfoSelector } from '../store/tokens-market-info/token-market-info.selectors';
import {
  useAccountsGasTokensSelector,
  useAccountTokensAndGasTokenSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../store/wallet/wallet.selectors';
import { getAccountTokensSlug } from '../utils/address.util';
import { getCurrentToken } from '../utils/get-current-token.util';
import { getDollarValue } from '../utils/get-dollar-amount.util';
import { getTokenMetadataSlug } from '../utils/token-metadata.util';
import { getTokenSlug } from '../utils/token.utils';

export const useTokenBalance = (tokenAddress: string, tokenId?: string) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const network = useSelectedNetworkSelector();
  const allTokensMarketInfo = useTokensMarketInfoSelector();
  const accountsGasTokens = useAccountsGasTokensSelector();
  const tokens = useAccountTokensAndGasTokenSelector();

  const accountGasTokenSlug = getAccountTokensSlug(network.chainId, publicKeyHash);

  const tokenSlug = getTokenSlug(tokenAddress, tokenId);
  const tokenMetadataSlug = getTokenMetadataSlug(network.chainId, tokenAddress, tokenId);

  const token = getCurrentToken(tokens, tokenSlug);

  const tokenBalance =
    tokenSlug === getTokenSlug(GAS_TOKEN_ADDRESS)
      ? Number(accountsGasTokens[accountGasTokenSlug]?.data)
      : Number(token?.balance.data) ?? 0;

  const fiatBalance = getDollarValue({
    amount: tokenBalance,
    price: isDefined(allTokensMarketInfo[tokenMetadataSlug]) ? allTokensMarketInfo[tokenMetadataSlug].price : 0,
    decimals: token?.decimals ?? 0,
    toFixed: false
  });

  return {
    tokenBalance: new BigNumber(tokenBalance),
    fiatBalance: fiatBalance.toString()
  };
};
