import { InitialState, NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import React, { FC, createRef, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';

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
import { setTransactionFromDapp } from '../../store/wallet/wallet.actions';
import {
  useDappInfoSelector,
  useIsAuthorisedSelector,
  useSelectedAccountPublicKeyHashSelector
} from '../../store/wallet/wallet.selectors';
import { getStoredValue, setStoredValue } from '../../utils/store.util';
import { Button } from '../button/button';

import { modalScreenOptions, modalScreenOptionsWithBackButton } from './constants/modal-screen-options';
import { PERSISTENCE_KEY } from './constants/perstistence-key';
import { Stack } from './utils/get-stack-navigator';

export const navigationRef = createRef<NavigationContainerRef<ScreensParamList>>();

export const Navigator: FC = () => {
  const dispatch = useDispatch();
  const dappInfo = useDappInfoSelector();
  const isAuthorised = useIsAuthorisedSelector();
  const selectedAcc = useSelectedAccountPublicKeyHashSelector();
  const { isLocked } = useUnlock();
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<InitialState>();
  const [dappInfoState, setDappInfo] = useState({});
  console.log(dappInfoState, 'dapp state');
  //   data:
  // data:
  // id: 905315567
  // jsonrpc: "2.0"
  // result: "0x13141df"
  // [[Prototype]]: Object
  // name: "metamask-provider"
  // [[Prototype]]: Object
  // target: "metamask-inpage"

  useEffect(() => {
    setDappInfo(JSON.parse(dappInfo.transactionInfo));
  }, [dappInfo]);

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

  console.log(dappInfo, 'DAPP INFO!!!');

  const channel = new BroadcastChannel('YOUR_CHANNEL_NAME');
  const channel2 = new BroadcastChannel('YOUR_CHANNEL_NAME22');

  window.addEventListener('DOMContentLoaded', event => {
    console.log('APP is loaded!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    channel.postMessage({ msg: 'background' });
  });

  const sendMesg = obj => {
    browser.tabs.query({ active: true }).then(tabs => {
      console.log(tabs[0].id, 'TABS');
      console.log(obj, 'SENDING OBJ');
      browser.tabs.sendMessage(tabs[0]?.id, obj);
    });
  };

  channel.onmessage = msg => {
    console.log('message received from service worker', msg);
    dispatch(setTransactionFromDapp(JSON.stringify(msg.data?.msg)));
    channel2.postMessage({ result: 'INFO FROM APP COMPONENT' });
    // channel.postMessage({ msg: 'Hello service worker from popup' });
  };

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
          <Stack.Screen name={ScreensEnum.ImportAccount} component={ImportAccount} />
        )}
      </Stack.Navigator>

      {isLocked && isAuthorised && (
        <View style={{ zIndex: 1000, backgroundColor: 'grey', height: '100vh', width: '100vw' }}>
          <Text>{JSON.stringify(dappInfoState)}</Text>
          <Button
            title="send"
            onPress={() =>
              sendMesg({
                data: { data: { ...dappInfoState, result: [selectedAcc] }, name: 'metamask-provider' },
                target: 'metamask-inpage'
              })
            }
          />
        </View>
      )}
    </NavigationContainer>
  );
};
