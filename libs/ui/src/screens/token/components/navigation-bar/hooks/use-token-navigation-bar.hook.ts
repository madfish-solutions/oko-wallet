import { useMemo } from 'react';

import { IconNameEnum } from '../../../../../components/icon/icon-name.enum';
import { modernCivilizationDidNotReachThisNetwork } from '../../../../../components/toast/constants/toast-messages';
import { ScreensEnum } from '../../../../../enums/sreens.enum';
import { useSwapSupported } from '../../../../../hooks/use-swap-supported.hook';

export interface TokenNavigationBarOption {
  id: number;
  iconName: IconNameEnum;
  routeName: ScreensEnum.SendToken | ScreensEnum.Receive | ScreensEnum.Swap;
  disabled?: boolean;
  disabledMessage?: string;
}

export const useTokenNavigationBar = (): TokenNavigationBarOption[] => {
  const isSwapSupported = useSwapSupported();

  return useMemo(
    () => [
      {
        id: 1,
        iconName: IconNameEnum.Swap,
        routeName: ScreensEnum.Swap,
        disabled: !isSwapSupported,
        disabledMessage: modernCivilizationDidNotReachThisNetwork
      },
      {
        id: 2,
        iconName: IconNameEnum.Receive,
        routeName: ScreensEnum.Receive
      },
      {
        id: 3,
        iconName: IconNameEnum.Send,
        routeName: ScreensEnum.SendToken
      },
      {
        id: 4,
        iconName: IconNameEnum.Topup,
        routeName: ScreensEnum.SendToken,
        disabled: true
      }
    ],
    [isSwapSupported]
  );
};
