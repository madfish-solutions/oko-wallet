import { isDefined } from '@rnw-community/shared';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addNewTokensAction } from '../../../store/wallet/wallet.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';
import { getDebankId } from '../../../utils/get-debank-id.util';

export const useActiveTokenList = () => {
  const dispatch = useDispatch();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();

  useEffect(() => {
    const debankId = getDebankId(chainId);

    if (isDefined(debankId)) {
      dispatch(addNewTokensAction.submit({ debankId, publicKeyHash }));
    }
  }, [chainId, publicKeyHash]);
};
