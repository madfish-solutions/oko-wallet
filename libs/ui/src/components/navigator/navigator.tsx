import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC, useState } from 'react';

import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { ImportAccount } from '../../screens/import-account/import-account';
import { Receive } from '../../screens/receive/receive';
import { Send } from '../../screens/send/send';
import { Settings } from '../../screens/settings/settings';
import { Wallet } from '../../screens/wallet/wallet';
import { TokenList } from '../../screens/token-list/token-list';

const Stack = createNativeStackNavigator<ScreensParamList>();

export const Navigator: FC = () => {
  const [isAuthorised, setIsAuthorised] = useState(false);

  const handleAuthorisation = () => setIsAuthorised(true);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthorised && (
          <Stack.Screen name={ScreensEnum.ImportAccount}>
            {props => <ImportAccount {...props} handleAuthorisation={handleAuthorisation} />}
          </Stack.Screen>
        )}
        {isAuthorised && (
          <>
            <Stack.Screen name={ScreensEnum.Wallet} component={Wallet} />
            <Stack.Screen name={ScreensEnum.Receive} component={Receive} />
            <Stack.Screen name={ScreensEnum.Settings} component={Settings} />
            <Stack.Screen name={ScreensEnum.Send} component={Send} />
            <Stack.Screen name={ScreensEnum.TokenList} component={TokenList} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
