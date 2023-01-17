import { isNotEmptyString } from '@rnw-community/shared';
import { useDispatch } from 'react-redux';

import { DATA_UPDATE_TIME } from '../../../constants/update-time';
import { useTimerEffect } from '../../../hooks/use-timer-effect.hook';
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

  const getTokensPriceInfo = () => {
    if (isNotEmptyString(publicKeyHash)) {
      const tokenAddressesList = visibleAccountTokens.map(visibleAccountToken => visibleAccountToken.tokenAddress);

      dispatch(loadTokensPriceInfo.submit({ tokenAddressesList, chainId }));
    }
  };

  useTimerEffect(getTokensPriceInfo, DATA_UPDATE_TIME, [chainId, rpcUrl, publicKeyHash, visibleAccountTokens]);
};
