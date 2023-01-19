import { useNavigationState } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { getDebankId } from '../../../api/utils/get-debank-id.util';
import { DATA_UPDATE_TIME } from '../../../constants/update-time';
import { ScreensEnum } from '../../../enums/sreens.enum';
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

  const navigationState = useNavigationState(state => state);

  const currentScreen = useMemo(() => {
    if (isDefined(navigationState)) {
      return navigationState.routes[navigationState.routes.length - 1].name as ScreensEnum;
    }
  }, [navigationState]);

  const getActiveTokenList = () => {
    const debankId = getDebankId(chainId);

    if (isDefined(debankId) && isNotEmptyString(publicKeyHash)) {
      dispatch(getAllUserTokensAction.submit({ debankId, publicKeyHash }));
    }
  };

  useTimerEffect(
    () => {
      if (isDefined(currentScreen) && !SCREENS_WITHOUT_UPDATE.includes(currentScreen)) {
        getActiveTokenList();
      }
    },
    DATA_UPDATE_TIME,
    [chainId, publicKeyHash, currentScreen]
  );
};
