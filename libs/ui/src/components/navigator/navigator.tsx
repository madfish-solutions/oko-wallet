import { InitialState, NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import React, { FC, createRef, useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useUnlock } from '../../hooks/use-unlock.hook';
import { AccountsSelector } from '../../modals/screens/accounts-selector/accounts-selector';
import { AddAccount } from '../../modals/screens/add-account/add-account';
import { EditAccount } from '../../modals/screens/edit-account/edit-account';
import { NetworksSelector } from '../../modals/screens/networks-selector/networks-selector';
import { AccountTokens } from '../../screens/account-tokens/account-tokens';
import { AddNetwork } from '../../screens/add-network/add-network';
import { AddNewToken } from '../../screens/add-new-token/add-new-token';
import { ConnectToDapps } from '../../screens/connect-to-dapps/connect-to-dapps';
import { ImportAccount } from '../../screens/import-account/import-account';
import { ManageTokens } from '../../screens/manage-tokens/manage-tokens';
import { Receive } from '../../screens/receive/receive';
import { SendConfirmation } from '../../screens/send-confirmation/send-confirmation';
import { Send } from '../../screens/send/send';
import { Settings } from '../../screens/settings/settings';
import { UnlockApp } from '../../screens/unlock-app/unlock-app';
import { Wallet } from '../../screens/wallet/wallet';
import { useIsAuthorisedSelector } from '../../store/wallet/wallet.selectors';
import { getStoredValue, setStoredValue } from '../../utils/store.util';

import { modalScreenOptions, modalScreenOptionsWithBackButton } from './constants/modal-screen-options';
import { PERSISTENCE_KEY } from './constants/perstistence-key';
import { Stack } from './utils/get-stack-navigator';

export const navigationRef = createRef<NavigationContainerRef<ScreensParamList>>();

export const Navigator: FC = () => {
  const isAuthorised = useIsAuthorisedSelector();
  const { isLocked } = useUnlock();
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<InitialState>();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString: InitialState = await getStoredValue(PERSISTENCE_KEY);
        const state = isDefined(savedStateString) ? savedStateString : undefined;
        if (state !== undefined) {
          setInitialState(state);
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      onStateChange={state => setStoredValue(PERSISTENCE_KEY, JSON.stringify(state))}
    >
      <Stack.Navigator>
        {isAuthorised ? (
          <>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name={ScreensEnum.Wallet} component={Wallet} />
              <Stack.Screen name={ScreensEnum.Receive} component={Receive} />
              <Stack.Screen name={ScreensEnum.Settings} component={Settings} />
              <Stack.Screen name={ScreensEnum.AddNetwork} component={AddNetwork} />
              <Stack.Screen name={ScreensEnum.Send} component={Send} />
              <Stack.Screen name={ScreensEnum.AddNewToken} component={AddNewToken} />
              <Stack.Screen name={ScreensEnum.ManageTokens} component={ManageTokens} />
              <Stack.Screen name={ScreensEnum.ConnectToDapps} component={ConnectToDapps} />
              <Stack.Screen name={ScreensEnum.SendConfirmation} component={SendConfirmation} />
              <Stack.Screen name={ScreensEnum.AccountTokens} component={AccountTokens} />
            </Stack.Group>

            <Stack.Group screenOptions={modalScreenOptions}>
              <Stack.Screen
                name={ScreensEnum.AccountsSelector}
                options={{ title: 'Accounts' }}
                component={AccountsSelector}
              />
              <Stack.Screen
                name={ScreensEnum.NetworksSelector}
                options={{ title: 'Networks' }}
                component={NetworksSelector}
              />
            </Stack.Group>

            <Stack.Group screenOptions={modalScreenOptionsWithBackButton}>
              <Stack.Screen
                name={ScreensEnum.EditAccount}
                options={{ title: 'Edit account' }}
                component={EditAccount}
              />
              <Stack.Screen
                name={ScreensEnum.AddAccount}
                options={{ title: 'Add new account' }}
                component={AddAccount}
              />
            </Stack.Group>
          </>
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ScreensEnum.ImportAccount} component={ImportAccount} />
          </Stack.Group>
        )}
      </Stack.Navigator>

      {isLocked && isAuthorised && <UnlockApp />}
    </NavigationContainer>
  );
};
