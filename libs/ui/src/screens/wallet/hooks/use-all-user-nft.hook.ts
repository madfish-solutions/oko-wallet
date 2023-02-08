import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { useDispatch } from 'react-redux';

import { getDebankId } from '../../../api/debank/utils/get-debank-id.util';
import { DATA_UPDATE_TIME } from '../../../constants/update-time';
import { useTimerEffect } from '../../../hooks/use-timer-effect.hook';
import { getAllUserNftAction } from '../../../store/wallet/wallet.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';

export const useAllUserNft = () => {
  const dispatch = useDispatch();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();

  const getAllUserNft = () => {
    const debankId = getDebankId(chainId);

    if (isDefined(debankId) && isNotEmptyString(publicKeyHash)) {
      dispatch(getAllUserNftAction.submit({ debankId, publicKeyHash }));
    }
  };

  useTimerEffect(getAllUserNft, DATA_UPDATE_TIME, [chainId, publicKeyHash]);
};
