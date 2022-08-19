import { InitialState, NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import queryString from 'query-string';
import React, { FC, createRef, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useUnlock } from '../../hooks/use-unlock.hook';
import { AccountsSelector } from '../../modals/screens/accounts-selector/accounts-selector';
import { AddAccount } from '../../modals/screens/add-account/add-account';
import { DappConfirmation } from '../../modals/screens/dapp-confirmation/dapp-confirmation';
import { EditAccount } from '../../modals/screens/edit-account/edit-account';
import { AddNetwork } from '../../modals/screens/network/add-network/add-network';
import { EditNetwork } from '../../modals/screens/network/edit-network/edit-network';
import { NetworksSelector } from '../../modals/screens/networks-selector/networks-selector';
import { AddNewToken } from '../../screens/add-new-token/add-new-token';
import { ConnectToDapps } from '../../screens/connect-to-dapps/connect-to-dapps';
import { ImportAccount } from '../../screens/import-account/import-account';
import { ManageTokens } from '../../screens/manage-tokens/manage-tokens';
import { Receive } from '../../screens/receive/receive';
import { SendConfirmation } from '../../screens/send-confirmation/send-confirmation';
import { Send } from '../../screens/send/send';
import { Settings } from '../../screens/settings/settings';
import { Tokens } from '../../screens/tokens/tokens';
import { UnlockApp } from '../../screens/unlock-app/unlock-app';
import { Wallet } from '../../screens/wallet/wallet';
import { changeConfirmationScreenStatus, setConnectionFromDapp } from '../../store/wallet/wallet.actions';
import { useIsAuthorisedSelector, useIsConfirmationScreenSelector } from '../../store/wallet/wallet.selectors';
import { getStoredValue, setStoredValue } from '../../utils/store.util';

import { modalScreenOptions, modalScreenOptionsWithBackButton } from './constants/modal-screen-options';
import { PERSISTENCE_KEY } from './constants/perstistence-key';
import { Stack } from './utils/get-stack-navigator';

export const navigationRef = createRef<NavigationContainerRef<ScreensParamList>>();

export const Navigator: FC = () => {
  const dispatch = useDispatch();
  const isAuthorised = useIsAuthorisedSelector();
  const { isLocked } = useUnlock();
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<InitialState>();
  const isConfirmationScreen = useIsConfirmationScreenSelector();
  const [dappName, setDappName] = useState('');

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

  // @TODO: save channel name in .env file
  const channel = new BroadcastChannel('KlaytnWallet');

  // invoke background script when popup is loaded
  useEffect(() => {
    const query = queryString.parse(location.search);
    if (query?.confirmation) {
      console.log(query.origin);
      dispatch(changeConfirmationScreenStatus(true));
      dispatch(setConnectionFromDapp({ chainId: '', dappName: query?.origin as string, data: { id: query?.id } }));
      setDappName(query?.origin as string);
    }
    console.log(query, 'PARAMS!!');
  }, []);

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
              <Stack.Screen name={ScreensEnum.Send} component={Send} />
              <Stack.Screen name={ScreensEnum.AddNewToken} component={AddNewToken} />
              <Stack.Screen name={ScreensEnum.ManageTokens} component={ManageTokens} />
              <Stack.Screen name={ScreensEnum.ConnectToDapps} component={ConnectToDapps} />
              <Stack.Screen name={ScreensEnum.SendConfirmation} component={SendConfirmation} />
              <Stack.Screen name={ScreensEnum.Tokens} component={Tokens} />
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
              {/* {isConfirmationScreen && (
                <Stack.Screen
                  name={ScreensEnum.DappConfirmation}
                  options={{ title: 'Dapp' }}
                  component={DappConfirmation}
                />
              )} */}
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
              <Stack.Screen
                name={ScreensEnum.AddNetwork}
                options={{ title: 'Add new network' }}
                component={AddNetwork}
              />
              <Stack.Screen
                name={ScreensEnum.EditNetwork}
                options={{ title: 'Edit network' }}
                component={EditNetwork}
              />
            </Stack.Group>
          </>
        ) : (
          <Stack.Screen name={ScreensEnum.ImportAccount} component={ImportAccount} />
        )}
      </Stack.Navigator>

      {isConfirmationScreen && isAuthorised && <DappConfirmation dappName={dappName} />}

      {isLocked && isAuthorised && <UnlockApp />}
    </NavigationContainer>
  );
};
