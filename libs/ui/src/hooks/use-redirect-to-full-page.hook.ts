import { useNavigationState } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import { useEffect, useMemo } from 'react';

import { ScreensEnum } from '../enums/sreens.enum';
import { isPopup } from '../utils/location.utils';
import { openFullViewPage } from '../utils/open-maximise-screen.util';

const IS_ONLY_FULL_PAGE_SCREENS = [
  ScreensEnum.Welcome,
  ScreensEnum.AddNewCollectible,
  ScreensEnum.AddNewToken,
  ScreensEnum.AddNetwork,
  ScreensEnum.CreateANewWallet,
  ScreensEnum.ImportWallet,
  ScreensEnum.VerifyMnemonic,
  ScreensEnum.AlmostDone
];

export const useRedirectToFullPage = () => {
  const navigationState = useNavigationState(state => state);

  const currentScreen = useMemo(() => {
    if (isDefined(navigationState)) {
      return navigationState.routes[navigationState.routes.length - 1].name as ScreensEnum;
    }
  }, [navigationState]);

  useEffect(() => {
    if (isDefined(currentScreen) && isPopup && IS_ONLY_FULL_PAGE_SCREENS.includes(currentScreen)) {
      openFullViewPage();
    }
  }, [currentScreen]);
};
