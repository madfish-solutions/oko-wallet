import { isDefined } from '@rnw-community/shared';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getDebankId } from '../../../api/utils/get-debank-id.util';
import { getAllUserNftAction } from '../../../store/wallet/wallet.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';

export const useAllUserNft = () => {
  const dispatch = useDispatch();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();

  useEffect(() => {
    const debankId = getDebankId(chainId);

    if (isDefined(debankId)) {
      dispatch(getAllUserNftAction.submit({ debankId, publicKeyHash }));
    }
  }, [chainId, publicKeyHash]);
};
