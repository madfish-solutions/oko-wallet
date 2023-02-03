import { RouteProp } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ONE_INCH_GAS_TOKEN_ADDRESS } from '../../../../api/1inch/constants';
import { get1inchTokenAddress } from '../../../../api/1inch/utils/get-1inch-token-address.util';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { TokenMetadata } from '../../../../interfaces/token-metadata.interface';
import { addNewTokensMetadataAction } from '../../../../store/wallet/wallet.actions';
import { useSelectedNetworkSelector, useTokensMetadataSelector } from '../../../../store/wallet/wallet.selectors';
import { getTokenMetadataSlug } from '../../../../utils/token-metadata.util';

export const useGetRouteTokensMetadata = ({
  routes,
  toToken
}: RouteProp<ScreensParamList, ScreensEnum.SwapRoute>['params']) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const tokensMetadata = useTokensMetadataSelector();
  const { chainId, gasTokenMetadata } = useSelectedNetworkSelector();
  const tokensMetadataRef = useRef<Record<string, TokenMetadata>>({
    [get1inchTokenAddress(toToken.tokenAddress)]: toToken
  });

  useEffect(() => {
    const tokensAddressesWithoutMetadata: string[] = [];

    routes.flat(2).forEach(({ fromTokenAddress }) => {
      if (fromTokenAddress === ONE_INCH_GAS_TOKEN_ADDRESS) {
        tokensMetadataRef.current[ONE_INCH_GAS_TOKEN_ADDRESS] = gasTokenMetadata;
      } else {
        const tokenMetadataSlug = getTokenMetadataSlug(chainId, fromTokenAddress);
        const token = tokensMetadata[tokenMetadataSlug];

        if (isDefined(token)) {
          tokensMetadataRef.current[fromTokenAddress] = token;
        } else if (!tokensAddressesWithoutMetadata.includes(fromTokenAddress)) {
          tokensAddressesWithoutMetadata.push(fromTokenAddress);
        }
      }
    });

    if (tokensAddressesWithoutMetadata.length) {
      dispatch(addNewTokensMetadataAction.submit(tokensAddressesWithoutMetadata));
    } else {
      setLoading(false);
    }
  }, [tokensMetadata]);

  return { tokensMetadata: tokensMetadataRef.current, loading };
};
