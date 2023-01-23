import { RouteProp } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import { useEffect, useRef, useState } from 'react';

import { ONE_INCH_GAS_TOKEN_ADDRESS } from '../../../../api/constants/1inch-agregator';
import { GAS_TOKEN_ADDRESS } from '../../../../constants/defaults';
import { Erc20Abi__factory } from '../../../../contract-types';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useSelectedNetworkSelector, useTokensMetadataSelector } from '../../../../store/wallet/wallet.selectors';
import { getDefaultEvmProvider } from '../../../../utils/get-default-evm-provider.utils';
import { getTokenMetadataSlug } from '../../../../utils/token-metadata.util';
import { TokenFromRoute } from '../types';

export const useGetTokens = ({ routes, toToken }: RouteProp<ScreensParamList, ScreensEnum.SwapRoute>['params']) => {
  const [loading, setLoading] = useState(true);
  const tokensMetadata = useTokensMetadataSelector();
  const { chainId, gasTokenMetadata, rpcUrl } = useSelectedNetworkSelector();
  const tokens = useRef<TokenFromRoute>({
    [toToken.tokenAddress === GAS_TOKEN_ADDRESS ? ONE_INCH_GAS_TOKEN_ADDRESS : toToken.tokenAddress]: toToken
  });

  useEffect(() => {
    const tokensAddressesWithoutMetadata: string[] = [];

    routes.flat(2).forEach(({ fromTokenAddress }) => {
      if (fromTokenAddress === ONE_INCH_GAS_TOKEN_ADDRESS) {
        tokens.current[ONE_INCH_GAS_TOKEN_ADDRESS] = gasTokenMetadata;
      } else {
        const tokenMetadataSlug = getTokenMetadataSlug(chainId, fromTokenAddress);
        const token = tokensMetadata[tokenMetadataSlug];

        if (isDefined(token)) {
          tokens.current[fromTokenAddress] = token;
        } else if (!tokensAddressesWithoutMetadata.includes(fromTokenAddress)) {
          tokensAddressesWithoutMetadata.push(fromTokenAddress);
        }
      }
    });

    if (tokensAddressesWithoutMetadata.length) {
      Promise.all(
        tokensAddressesWithoutMetadata.map(tokenAddress => {
          const provider = getDefaultEvmProvider(rpcUrl);
          const contract20 = Erc20Abi__factory.connect(tokenAddress, provider);

          return contract20.symbol();
        })
      )
        .then(symbols =>
          symbols.forEach((symbol, index) => (tokens.current[tokensAddressesWithoutMetadata[index]] = { symbol }))
        )
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return { tokens: tokens.current, loading };
};
