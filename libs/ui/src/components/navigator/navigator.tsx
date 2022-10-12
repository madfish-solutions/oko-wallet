import { NavigationContainer, NavigationContainerRef, DarkTheme } from '@react-navigation/native';
import React, { FC, createRef, useEffect } from 'react';
import { View, Text } from 'react-native';

import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useDappConnection } from '../../hooks/use-dapp-connection.hook';
import { PERSISTENCE_KEY, usePersistedNavigationState } from '../../hooks/use-persisted-navigation-state.hook';
import { useUnlock } from '../../hooks/use-unlock.hook';
import { AccountsSelector } from '../../modals/screens/accounts-selector/accounts-selector';
import { AddAccount } from '../../modals/screens/add-account/add-account';
import { AddNewCollectible } from '../../modals/screens/add-new-collectible/add-new-collectible';
import { Collectible } from '../../modals/screens/collectible/collectible';
import { DappConfirmation } from '../../modals/screens/dapp-confirmation/dapp-confirmation';
import { DeleteDapp } from '../../modals/screens/delete-dapp/delete-dapp';
import { EditAccount } from '../../modals/screens/edit-account/edit-account';
import { AddNetwork } from '../../modals/screens/network/add-network/add-network';
import { EditNetwork } from '../../modals/screens/network/edit-network/edit-network';
import { NetworksSelector } from '../../modals/screens/networks-selector/networks-selector';
import { RevealPrivateKey } from '../../modals/screens/reveal-private-key/reveal-private-key';
import { RevealSeedPhrase } from '../../modals/screens/reveal-seed-phrase/reveal-seed-phrase';
import { AddNewToken } from '../../modals/screens/token/add-token/add-token';
import { EditToken } from '../../modals/screens/token/edit-token/edit-token';
import { WordsAmountSelector } from '../../modals/screens/words-amount-selector/words-amount-selector';
import { Activity } from '../../screens/activity/activity';
import { AlmostDone } from '../../screens/almost-done/almost-done';
import { Authorization } from '../../screens/authorization/authorization';
import { CollectiblesList } from '../../screens/collectibles/screens/collectibles-list/collectibles-list';
import { SpecificCollectiblesList } from '../../screens/collectibles/screens/specific-collectibles-list/specific-collectibles-list';
import { ConnectToDapps } from '../../screens/connect-to-dapps/connect-to-dapps';
import { CreateANewWallet } from '../../screens/create-wallet/screens/create-a-new-wallet/create-a-new-wallet';
import { VerifyMnemonic } from '../../screens/create-wallet/screens/verify-mnemonic/verify-mnemonic';
import { ImportWallet } from '../../screens/import-wallet/import-wallet';
import { ManageTokens } from '../../screens/manage-tokens/manage-tokens';
import { Receive } from '../../screens/receive/receive';
import { ScanQrCode } from '../../screens/scan-qr-code/scan-qr-code';
import { SendConfirmation } from '../../screens/send-confirmation/send-confirmation';
import { AccountsSelector as SendAccountsSelector } from '../../screens/send/components/accounts-selector/accounts-selector';
import { TokensSelector as SendTokensSelector } from '../../screens/send/components/tokens-selector/tokens-selector';
import { Send } from '../../screens/send/send';
import { AboutUs as SettingsAboutUs } from '../../screens/settings/screens/about-us/about-us';
import { AccountsSettings } from '../../screens/settings/screens/acсounts-settings/acсounts-settings';
import { AppearanceSelector as SettingsAppearanceSelector } from '../../screens/settings/screens/appearance-selector/appearance-selector';
import { AuthorizedDapps } from '../../screens/settings/screens/authorized-dapps/authorized-dapps';
import { ChangePassword } from '../../screens/settings/screens/change-password/change-password';
import { CurrencySelector as SettingsCurrencySelector } from '../../screens/settings/screens/currency-selector/currency-selector';
import { General as SettingsGeneral } from '../../screens/settings/screens/general/general';
import { LockTimeSelector as SettingsLockTimeSelector } from '../../screens/settings/screens/lock-time-selector/lock-time-selector';
import { ResetWalletConfirm as SettingsResetWalletConfirm } from '../../screens/settings/screens/reset-wallet-confirm/reset-wallet-confirm';
import { Security as SettingsSecurity } from '../../screens/settings/screens/security/security';
import { Settings } from '../../screens/settings/settings';
import { Token } from '../../screens/token/token';
import { Tokens } from '../../screens/tokens/tokens';
import { UnlockApp } from '../../screens/unlock-app/unlock-app';
import { Wallet } from '../../screens/wallet/wallet';
import { useIsAuthorisedSelector } from '../../store/wallet/wallet.selectors';
import { checkActiveApplicationSession } from '../../utils/check-active-application-session.util';
import { openMaximiseScreen } from '../../utils/open-maximise-screen.util';
import { setStoredValue } from '../../utils/store.util';
import { substring } from '../../utils/substring.util';

import { modalScreenOptions, modalScreenOptionsWithBackButton } from './constants/modal-screen-options';
import { useActiveTokenList } from './hooks/use-active-token-list.hook';
import { useTokensPriceInfo } from './hooks/use-tokens-price-info.hook';
import { Stack } from './utils/get-stack-navigator';

export const globalNavigationRef = createRef<NavigationContainerRef<ScreensParamList>>();

export const Navigator: FC = () => {
  const { initialState, isReady, handleStateChange } = usePersistedNavigationState();
  const isAuthorised = useIsAuthorisedSelector();
  const { isLocked } = useUnlock();

  useDappConnection();
  useActiveTokenList();
  useTokensPriceInfo();

  const { isPopupOpened } = checkActiveApplicationSession();

  useEffect(() => {
    // TODO: Add check for ScreenEnum.AlmostDone screen later
    const isCreateWalletScreensOpened =
      initialState?.routes.some(
        route => route.name === ScreensEnum.CreateANewWallet || route.name === ScreensEnum.VerifyMnemonic
      ) ?? false;

    if (isPopupOpened && isCreateWalletScreensOpened && isReady) {
      // clear previous navigation state and leave only ScreenEnum.ImportAccount route when click by extension icon
      setStoredValue(PERSISTENCE_KEY, JSON.stringify({ ...initialState, routes: initialState?.routes.slice(0, 1) }));
      openMaximiseScreen();
    }
  }, [initialState, isReady]);

  if (!isReady) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <NavigationContainer
      ref={globalNavigationRef}
      initialState={initialState}
      onStateChange={handleStateChange}
      theme={DarkTheme}
    >
      <Stack.Navigator>
        {isAuthorised ? (
          <>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name={ScreensEnum.Wallet} component={Wallet} />
              <Stack.Screen name={ScreensEnum.Receive} component={Receive} />
              <Stack.Screen name={ScreensEnum.Settings} component={Settings} />
              <Stack.Screen name={ScreensEnum.AccountsSettings} component={AccountsSettings} />
              <Stack.Screen name={ScreensEnum.SettingsGeneral} component={SettingsGeneral} />
              <Stack.Screen name={ScreensEnum.SettingsSecurity} component={SettingsSecurity} />
              <Stack.Screen name={ScreensEnum.SettingsAboutUs} component={SettingsAboutUs} />
              <Stack.Screen name={ScreensEnum.Send} component={Send} />
              <Stack.Screen name={ScreensEnum.ManageTokens} component={ManageTokens} />
              <Stack.Screen name={ScreensEnum.ConnectToDapps} component={ConnectToDapps} />
              <Stack.Screen name={ScreensEnum.SendConfirmation} component={SendConfirmation} />
              <Stack.Screen name={ScreensEnum.Tokens} component={Tokens} />
              <Stack.Screen name={ScreensEnum.ScanQrCode} component={ScanQrCode} />
              <Stack.Screen name={ScreensEnum.Token} component={Token} />
              <Stack.Screen name={ScreensEnum.CollectiblesList} component={CollectiblesList} />
              <Stack.Screen name={ScreensEnum.SpecificCollectiblesList} component={SpecificCollectiblesList} />
              <Stack.Screen name={ScreensEnum.Activity} component={Activity} />
              <Stack.Screen name={ScreensEnum.ChangePassword} component={ChangePassword} />
              <Stack.Screen name={ScreensEnum.AuthorizedDapps} component={AuthorizedDapps} />
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
              <Stack.Screen
                name={ScreensEnum.SendTokensSelector}
                options={{ title: 'Select Token From' }}
                component={SendTokensSelector}
              />
              <Stack.Screen
                name={ScreensEnum.SendAccountsSelector}
                options={{ title: 'Select Account' }}
                component={SendAccountsSelector}
              />
              <Stack.Screen
                name={ScreensEnum.Collectible}
                options={({ route }) => ({ title: substring(route.params.collectible.name, 30) })}
                component={Collectible}
              />
              <Stack.Screen
                name={ScreensEnum.RevealSeedPhrase}
                options={{ title: 'Reveal Seed phrase' }}
                component={RevealSeedPhrase}
              />
              <Stack.Screen
                name={ScreensEnum.RevealPrivateKey}
                options={{ title: 'Reveal Private Key' }}
                component={RevealPrivateKey}
              />
              <Stack.Screen
                name={ScreensEnum.DappConfirmation}
                options={{ title: 'Connect' }}
                component={DappConfirmation}
              />
              <Stack.Screen
                name={ScreensEnum.DeleteDapp}
                options={{ title: 'Confirm disconnection' }}
                component={DeleteDapp}
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
              <Stack.Screen
                name={ScreensEnum.AddNewToken}
                options={{ title: 'Add new token' }}
                component={AddNewToken}
              />
              <Stack.Screen name={ScreensEnum.EditToken} options={{ title: 'Edit token' }} component={EditToken} />
              <Stack.Screen
                name={ScreensEnum.AddNewCollectible}
                options={{ title: 'Add new Collectible' }}
                component={AddNewCollectible}
              />
              <Stack.Screen
                name={ScreensEnum.SettingsCurrencySelector}
                options={{ title: 'Currency' }}
                component={SettingsCurrencySelector}
              />
              <Stack.Screen
                name={ScreensEnum.SettingsAppearanceSelector}
                options={{ title: 'Appearance' }}
                component={SettingsAppearanceSelector}
              />
              <Stack.Screen
                name={ScreensEnum.SettingsLockTimeSelector}
                options={{ title: 'Lock time' }}
                component={SettingsLockTimeSelector}
              />
              <Stack.Screen
                name={ScreensEnum.SettingsResetWalletConfirm}
                options={{ title: 'Reset Wallet' }}
                component={SettingsResetWalletConfirm}
              />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name={ScreensEnum.Authorization} component={Authorization} />
              <Stack.Screen name={ScreensEnum.ImportWallet} component={ImportWallet} />
              <Stack.Screen name={ScreensEnum.CreateANewWallet} component={CreateANewWallet} />
              <Stack.Screen name={ScreensEnum.VerifyMnemonic} component={VerifyMnemonic} />
              <Stack.Screen name={ScreensEnum.AlmostDone} component={AlmostDone} />
            </Stack.Group>

            <Stack.Group screenOptions={modalScreenOptions}>
              <Stack.Screen
                name={ScreensEnum.WordsAmountSelector}
                options={{ title: 'Amount Words' }}
                component={WordsAmountSelector}
              />
            </Stack.Group>
          </>
        )}
      </Stack.Navigator>

      {isLocked && isAuthorised && <UnlockApp />}
    </NavigationContainer>
  );
};
