import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addTokensPriceInfo } from '../../../store/tokens-market-info/tokens-market-info.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector,
  useVisibleAccountTokensSelector
} from '../../../store/wallet/wallet.selectors';

export const useTokensPriceInfo = () => {
  const dispatch = useDispatch();
  const { chainId } = useSelectedNetworkSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();

  useEffect(() => {
    const tokenAddressesList = visibleAccountTokens.map(visibleAccountToken => visibleAccountToken.tokenAddress);

    dispatch(addTokensPriceInfo.submit({ tokenAddressesList, chainId }));
  }, [chainId, visibleAccountTokens.length, publicKeyHash]);
};
