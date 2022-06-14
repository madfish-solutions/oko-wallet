import { isDefined } from '@rnw-community/shared';
import React from 'react';
import { View } from 'react-native';

import { ScreensEnum } from '../../enums/sreens.enum';

import { styles } from './navigation-bar.styles';
import { walletStackScreens } from './screen-stacks/wallet-screens.stack';
import { TabBarButton } from './tab-bar-button/tab-bar-button';

export const NavigationBar = () => {
  const isStackFocused = (screensStack: ScreensEnum[]) =>
    isDefined(ScreensEnum.Wallet) && screensStack.includes(ScreensEnum.Wallet);

  return (
    <View style={styles.root}>
      <TabBarButton routeName={ScreensEnum.Wallet} focused={isStackFocused(walletStackScreens)} />
      <TabBarButton routeName={ScreensEnum.Settings} focused={isStackFocused(walletStackScreens)} />
      {/* <TabBarButton routeName={ScreensEnum.Send} focused={isStackFocused(walletStackScreens)} />
      <TabBarButton routeName={ScreensEnum.Receive} focused={isStackFocused(walletStackScreens)} /> */}

      {/* <TouchableOpacity style={NavigationBarStyles.button} onPress={() => navigate(ScreensEnum.ConnectToDapps)}>
        <Text style={NavigationBarStyles.buttonText}>Dapps</Text>
      </TouchableOpacity> */}
    </View>
  );
};
