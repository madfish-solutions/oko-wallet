import { isDefined } from '@rnw-community/shared';
import { BigNumber } from 'bignumber.js';
import { NetworkTypeEnum } from 'shared';

import { GAS_TOKEN_ADDRESS } from '../constants/defaults';
import { useTokensMarketInfoSelector } from '../store/tokens-market-info/token-market-info.selectors';
import {
  useAllAccountsTokensAndTokensMetadataSelector,
  useAllNetworksSelector,
  useAccountsGasTokensSelector,
  useAllVisibleAccountsSelector
} from '../store/wallet/wallet.selectors';
import { getAccountTokensSlug } from '../utils/address.util';
import { getDollarValue } from '../utils/get-dollar-amount.util';
import { getTokenMetadataSlug } from '../utils/token-metadata.util';

export const useFiatTotalBalance = () => {
  const networks = useAllNetworksSelector();
  const accounts = useAllVisibleAccountsSelector();
  const accountsGasTokens = useAccountsGasTokensSelector();
  const allTokensMarketInfoSelector = useTokensMarketInfoSelector();
  const { accountsTokens, tokensMetadata } = useAllAccountsTokensAndTokensMetadataSelector();

  let totalAccountsBalance = new BigNumber(0);

  const accountsBalanceInUsd: Record<string, string> = accounts.reduce((acc, account) => {
    const {
      accountId,
      networksKeys: { EVM, Tezos }
    } = account;

    const evmPublicKeyHash = isDefined(EVM) && isDefined(EVM.publicKeyHash) ? EVM.publicKeyHash : '';
    const tezosPublicKeyHash = isDefined(Tezos) && isDefined(Tezos.publicKeyHash) ? Tezos.publicKeyHash : '';

    const gasTokenBalance = networks.reduce((sum, { chainId, networkType, gasTokenMetadata: { decimals } }) => {
      const tokenMetadataSlug = getTokenMetadataSlug(chainId, GAS_TOKEN_ADDRESS);
      const publicKeyHash = networkType === NetworkTypeEnum.Tezos ? tezosPublicKeyHash : evmPublicKeyHash;
      const accountGasTokenSlug = getAccountTokensSlug(chainId, publicKeyHash);
      const { price } = allTokensMarketInfoSelector[tokenMetadataSlug] ?? {};
      const amount = accountsGasTokens[accountGasTokenSlug]?.data;

      const dollarValue = getDollarValue({
        amount,
        price,
        decimals,
        errorValue: new BigNumber(0),
        toFixed: false
      });

      return dollarValue.plus(sum);
    }, new BigNumber(0));

    const tokensBalance = Object.entries(accountsTokens).reduce((sum, [accountTokensSlug, accountTokens]) => {
      const [chainId, accountPublicKeyHash] = accountTokensSlug.split('_');

      if (accountPublicKeyHash === evmPublicKeyHash || accountPublicKeyHash === tezosPublicKeyHash) {
        const accountTokensSum = accountTokens.reduce((previousValue, accountToken) => {
          const tokenMetadataSlug = getTokenMetadataSlug(chainId, accountToken.tokenAddress, accountToken.tokenId);
          const { price } = allTokensMarketInfoSelector[tokenMetadataSlug] ?? {};

          const dollarValue = getDollarValue({
            amount: accountToken.balance.data,
            decimals: tokensMetadata[tokenMetadataSlug]?.decimals,
            price,
            errorValue: new BigNumber(0),
            toFixed: false
          });

          return dollarValue.plus(previousValue);
        }, new BigNumber(0));

        return sum.plus(accountTokensSum);
      }

      return sum;
    }, new BigNumber(0));

    const totalSumOfGasTokenAndAccountToken = tokensBalance.plus(gasTokenBalance);
    totalAccountsBalance = totalAccountsBalance.plus(totalSumOfGasTokenAndAccountToken);

    return { ...acc, [accountId]: totalSumOfGasTokenAndAccountToken.toFixed(2) };
  }, {});

  return { accountsBalanceInUsd, totalAccountsBalance: totalAccountsBalance.toFixed(2) };
};
