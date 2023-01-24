import { isDefined } from '@rnw-community/shared';
import { useEffect } from 'react';

import { ScreensEnum } from '../enums/sreens.enum';
import { isPopup } from '../utils/location.utils';
import { openFullViewPage } from '../utils/open-maximise-screen.util';

import { useCurrentRoute } from './use-current-route.hook';

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
  const currentRoute = useCurrentRoute();

  useEffect(() => {
    if (isDefined(currentRoute) && isPopup && IS_ONLY_FULL_PAGE_SCREENS.includes(currentRoute.name as ScreensEnum)) {
      openFullViewPage();
    }
  }, [currentRoute]);
};
