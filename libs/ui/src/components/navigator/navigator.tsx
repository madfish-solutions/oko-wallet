import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';

import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useUnlock } from '../../hooks/use-unlock.hook';
import { AddNetwork } from '../../screens/add-network/add-network';
import { AddNewToken } from '../../screens/add-new-token/add-new-token';
import { ImportAccount } from '../../screens/import-account/import-account';
import { ManageTokens } from '../../screens/manage-tokens/manage-tokens';
import { Receive } from '../../screens/receive/receive';
import { Send } from '../../screens/send/send';
import { Settings } from '../../screens/settings/settings';
import { UnlockApp } from '../../screens/unlock-app/unlock-app';
import { Wallet } from '../../screens/wallet/wallet';
import { useIsAuthorisedSelector } from '../../store/wallet/wallet.selectors';

const Stack = createNativeStackNavigator<ScreensParamList>();

export const Navigator: FC = () => {
  const isAuthorised = useIsAuthorisedSelector();
  const { isLocked } = useUnlock();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthorised && <Stack.Screen name={ScreensEnum.ImportAccount} component={ImportAccount} />}
        {isLocked && isAuthorised && <Stack.Screen name={ScreensEnum.Unlock} component={UnlockApp} />}

        {isAuthorised && !isLocked && (
          <>
            <Stack.Screen name={ScreensEnum.Wallet} component={Wallet} />
            <Stack.Screen name={ScreensEnum.Receive} component={Receive} />
            <Stack.Screen name={ScreensEnum.Settings} component={Settings} />
            <Stack.Screen name={ScreensEnum.AddNetwork} component={AddNetwork} />
            <Stack.Screen name={ScreensEnum.Send} component={Send} />
            <Stack.Screen name={ScreensEnum.AddNewToken} component={AddNewToken} />
            <Stack.Screen name={ScreensEnum.ManageTokens} component={ManageTokens} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
