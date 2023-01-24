import { useNavigationState } from '@react-navigation/native';
import React from 'react';

import {
  receiveStackScreens,
  ScreensEnum,
  sendStackScreens,
  settingsStackScreens,
  swapStackScreens,
  walletStackScreens
} from '../../enums/sreens.enum';
import { useSwapSupported } from '../../hooks/use-swap-supported.hook';
import { useToast } from '../../hooks/use-toast.hook';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';
import { modernCivilizationDidNotReachThisNetwork } from '../toast/constants/toas-messages';

import { TabBarButton } from './components/tab-bar-button/tab-bar-button';
import { styles } from './navigation-bar.styles';
import { NavigationBarTestIDs } from './navigation-bar.test-ids';

export const NavigationBar = () => {
  const routes = useNavigationState(state => state.routes);
  const currentRoute = routes[routes.length - 1].name as ScreensEnum;
  const isStackFocused = (screensStack: ScreensEnum[]) => screensStack.includes(currentRoute);
  const isSwapSupported = useSwapSupported();
  const { showInfoToast } = useToast();

  const onDisabledSwapPress = () =>
    showInfoToast({
      message: 'Oops!',
      data: {
        description: modernCivilizationDidNotReachThisNetwork
      }
    });

  return (
    <Row style={styles.root}>
      <TabBarButton
        routeName={ScreensEnum.Wallet}
        name={IconNameEnum.Home}
        focused={isStackFocused(walletStackScreens)}
        testID={NavigationBarTestIDs.HomeButton}
      />

      <TabBarButton
        routeName={ScreensEnum.Receive}
        name={IconNameEnum.Receive}
        focused={isStackFocused(receiveStackScreens)}
        testID={NavigationBarTestIDs.ReceiveButton}
      />

      <TabBarButton
        routeName={ScreensEnum.Swap}
        name={IconNameEnum.Swap}
        focused={isStackFocused(swapStackScreens)}
        disabled={!isSwapSupported}
        onDisabledPress={onDisabledSwapPress}
        testID={NavigationBarTestIDs.SwapButton}
      />

      <TabBarButton
        routeName={ScreensEnum.SendToken}
        name={IconNameEnum.Send}
        focused={isStackFocused(sendStackScreens)}
        testID={NavigationBarTestIDs.SendButton}
      />

      <TabBarButton
        routeName={ScreensEnum.Settings}
        name={IconNameEnum.Settings}
        focused={isStackFocused(settingsStackScreens)}
        testID={NavigationBarTestIDs.SettingsButton}
      />
    </Row>
  );
};
