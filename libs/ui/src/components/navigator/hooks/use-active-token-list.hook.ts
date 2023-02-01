import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { useDispatch } from 'react-redux';

import { getDebankId } from '../../../api/debank/utils/get-debank-id.util';
import { DATA_UPDATE_TIME } from '../../../constants/update-time';
import { ScreensEnum } from '../../../enums/sreens.enum';
import { useCurrentRoute } from '../../../hooks/use-current-route.hook';
import { useTimerEffect } from '../../../hooks/use-timer-effect.hook';
import { getAllUserTokensAction } from '../../../store/wallet/wallet.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';

const SCREENS_WITHOUT_UPDATE = [ScreensEnum.Token];

export const useActiveTokenList = () => {
  const dispatch = useDispatch();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();

  const currentRoute = useCurrentRoute();

  useTimerEffect(
    () => {
      const debankId = getDebankId(chainId);

      if (
        isDefined(currentRoute) &&
        isDefined(debankId) &&
        isNotEmptyString(publicKeyHash) &&
        !SCREENS_WITHOUT_UPDATE.includes(currentRoute.name as ScreensEnum)
      ) {
        dispatch(getAllUserTokensAction.submit({ debankId, publicKeyHash }));
      }
    },
    DATA_UPDATE_TIME,
    [chainId, publicKeyHash, currentRoute]
  );
};
