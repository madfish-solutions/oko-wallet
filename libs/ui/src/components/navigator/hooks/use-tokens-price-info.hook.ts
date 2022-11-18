import { isNotEmptyString } from '@rnw-community/shared';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadTokensPriceInfo } from '../../../store/tokens-market-info/tokens-market-info.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector,
  useVisibleAccountTokensSelector
} from '../../../store/wallet/wallet.selectors';

export const useTokensPriceInfo = () => {
  const dispatch = useDispatch();
  const { chainId, rpcUrl } = useSelectedNetworkSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();

  useEffect(() => {
    if (isNotEmptyString(publicKeyHash)) {
      const tokenAddressesList = visibleAccountTokens.map(visibleAccountToken => visibleAccountToken.tokenAddress);

      dispatch(loadTokensPriceInfo.submit({ tokenAddressesList, chainId }));
    }
  }, [chainId, rpcUrl, visibleAccountTokens.length, publicKeyHash]);
};
