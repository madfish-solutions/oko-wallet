import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { useDispatch } from 'react-redux';

import { getDebankId } from '../../../api/utils/get-debank-id.util';
import { DATA_UPDATE_TIME } from '../../../constants/update-time';
import { useTimerEffect } from '../../../hooks/use-timer-effect.hook';
import { getAllUserTokensAction } from '../../../store/wallet/wallet.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';

export const useActiveTokenList = () => {
  const dispatch = useDispatch();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();

  const getActiveTokenList = () => {
    const debankId = getDebankId(chainId);

    if (isDefined(debankId) && isNotEmptyString(publicKeyHash)) {
      dispatch(getAllUserTokensAction.submit({ debankId, publicKeyHash }));
    }
  };

  useTimerEffect(getActiveTokenList, DATA_UPDATE_TIME, [chainId, publicKeyHash]);
};
