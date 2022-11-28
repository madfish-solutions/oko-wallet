import { isDefined } from '@rnw-community/shared';
import React from 'react';

import { ScreensEnum } from '../../enums/sreens.enum';
import { getCustomSize } from '../../styles/format-size';
import { Divider } from '../divider/divider';
import { IconNameEnum } from '../icon/icon-name.enum';
import { Row } from '../row/row';

import { styles } from './navigation-bar.styles';
import { NavigationBarTestIDs } from './navigation-bar.test-ids';
import { walletStackScreens } from './screen-stacks/wallet-screens.stack';
import { TabBarButton } from './tab-bar-button/tab-bar-button';

export const NavigationBar = () => {
  const isStackFocused = (screensStack: ScreensEnum[]) =>
    isDefined(ScreensEnum.Wallet) && screensStack.includes(ScreensEnum.Wallet);

  return (
    <Row style={styles.root}>
      <TabBarButton
        routeName={ScreensEnum.Wallet}
        name={IconNameEnum.Swap}
        focused={isStackFocused(walletStackScreens)}
        testID={NavigationBarTestIDs.HomeButton}
      />
      <Divider size={getCustomSize(3)} />
      <TabBarButton
        routeName={ScreensEnum.Receive}
        name={IconNameEnum.Receive}
        focused={isStackFocused(walletStackScreens)}
        testID={NavigationBarTestIDs.ReceiveButton}
      />
      <Divider size={getCustomSize(3)} />
      <TabBarButton
        routeName={ScreensEnum.SendToken}
        name={IconNameEnum.Send}
        focused={isStackFocused(walletStackScreens)}
        testID={NavigationBarTestIDs.SendButton}
      />
      <Divider size={getCustomSize(3)} />
      <TabBarButton
        routeName={ScreensEnum.Settings}
        name={IconNameEnum.Settings}
        focused={isStackFocused(walletStackScreens)}
        testID={NavigationBarTestIDs.SettingsButton}
      />
    </Row>
  );
};
