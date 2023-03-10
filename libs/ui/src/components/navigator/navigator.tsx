import { NavigationContainer, NavigationContainerRef, DarkTheme } from '@react-navigation/native';
import React, { FC, createRef } from 'react';

import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useAppLockTimer } from '../../hooks/use-app-lock-timer.hook';
import { useLockApp } from '../../hooks/use-lock-app.hook';
import { usePersistedNavigationState } from '../../hooks/use-persisted-navigation-state.hook';
import { AccountsSelector } from '../../modals/screens/accounts-selector/accounts-selector';
import { ActivityFilterSelector } from '../../modals/screens/activity-filter-selector/activity-filter-selector';
import { AddAccount } from '../../modals/screens/add-account/add-account';
import { AddNewCollectible } from '../../modals/screens/add-new-collectible/add-new-collectible';
import { Collectible } from '../../modals/screens/collectible/collectible';
import { ConfirmAccess } from '../../modals/screens/confirm-access/confirm-access';
import { DAppConnectionConfirmation } from '../../modals/screens/d-app-connection-confirmation/d-app-connection-confirmation';
import { DAppSignConfirmation } from '../../modals/screens/d-app-sign-confirmation/d-app-sign-confirmation';
import { DAppTransactionConfirmation } from '../../modals/screens/d-app-transaction-confirmation/d-app-transaction-confirmation';
import { DeleteDApp } from '../../modals/screens/delete-d-app/delete-d-app';
import { EditAccountName } from '../../modals/screens/edit-account-name/edit-account-name';
import { EditPermission } from '../../modals/screens/edit-permission/edit-permission';
import { AddNetwork } from '../../modals/screens/network/add-network/add-network';
import { EditNetwork } from '../../modals/screens/network/edit-network/edit-network';
import { NetworkChangeConfirmation } from '../../modals/screens/network-change-confirmation/network-change-confirmation';
import { NetworksSelector } from '../../modals/screens/networks-selector/networks-selector';
import { RevealPrivateKey } from '../../modals/screens/reveal-private-key/reveal-private-key';
import { RevealSeedPhrase } from '../../modals/screens/reveal-seed-phrase/reveal-seed-phrase';
import { SlippageSettings } from '../../modals/screens/slippage-settings/slippage-settings';
import { SwapRoute } from '../../modals/screens/swap-route/swap-route';
import { TokensSelector } from '../../modals/screens/tokens-selector/tokens-selector';
import { WordsAmountSelector } from '../../modals/screens/words-amount-selector/words-amount-selector';
import { Activity } from '../../screens/activity/activity';
import { AlmostDone } from '../../screens/almost-done/almost-done';
import { CollectiblesList } from '../../screens/collectibles/screens/collectibles-list/collectibles-list';
import { SpecificCollectiblesList } from '../../screens/collectibles/screens/specific-collectibles-list/specific-collectibles-list';
import { ConnectToDapps } from '../../screens/connect-to-dapps/connect-to-dapps';
import { CreateANewWallet } from '../../screens/create-wallet/screens/create-a-new-wallet/create-a-new-wallet';
import { VerifyMnemonic } from '../../screens/create-wallet/screens/verify-mnemonic/verify-mnemonic';
import { EditAccount } from '../../screens/edit-account/edit-account';
import { ImportWallet } from '../../screens/import-wallet/import-wallet';
import { Receive } from '../../screens/receive/receive';
import { ScanQrCode } from '../../screens/scan-qr-code/scan-qr-code';
import { CollectiblesSelector as SendCollectiblesSelector } from '../../screens/send/screens/send-collectible/components/collectibles-selector/collectibles-selector';
import { SendCollectible } from '../../screens/send/screens/send-collectible/send-collectible';
import { AccountsSelector as SendAccountsSelector } from '../../screens/send/screens/send-token/components/accounts-selector/accounts-selector';
import { SendToken } from '../../screens/send/screens/send-token/send-token';
import { SendConfirmation } from '../../screens/send-confirmation/send-confirmation';
import { AboutUs as SettingsAboutUs } from '../../screens/settings/screens/about-us/about-us';
import { AccountsSettings } from '../../screens/settings/screens/accounts-settings/acсounts-settings';
import { AppearanceSelector as SettingsAppearanceSelector } from '../../screens/settings/screens/appearance-selector/appearance-selector';
import { AuthorizedDApps } from '../../screens/settings/screens/authorized-d-apps/authorized-d-apps';
import { ChangePassword } from '../../screens/settings/screens/change-password/change-password';
import { CurrencySelector as SettingsCurrencySelector } from '../../screens/settings/screens/currency-selector/currency-selector';
import { General as SettingsGeneral } from '../../screens/settings/screens/general/general';
import { LockTimeSelector as SettingsLockTimeSelector } from '../../screens/settings/screens/lock-time-selector/lock-time-selector';
import { ResetWalletConfirm as SettingsResetWalletConfirm } from '../../screens/settings/screens/reset-wallet-confirm/reset-wallet-confirm';
import { Security as SettingsSecurity } from '../../screens/settings/screens/security/security';
import { Settings } from '../../screens/settings/settings';
import { SplashScreen } from '../../screens/splash-screen/splash-screen';
import { Swap } from '../../screens/swap/swap';
import { Token } from '../../screens/token/token';
import { Tokens } from '../../screens/tokens/tokens';
import { UnlockApp } from '../../screens/unlock-app/unlock-app';
import { Wallet } from '../../screens/wallet/wallet';
import { WalletCreated } from '../../screens/wallet-created/wallet-created';
import { Welcome } from '../../screens/welcome/welcome';
import { useShowLoaderSelector } from '../../store/settings/settings.selectors';
import { useIsAuthorisedSelector } from '../../store/wallet/wallet.selectors';
import { substring } from '../../utils/substring.util';
import { FullScreenLoader } from '../loader/components/full-screen-loader/full-screen-loader';

import { ComponentWithNavigationContext } from './components/component-with-navigation-context/component-with-navigation-context';
import { modalScreenOptions, modalScreenOptionsWithBackButton } from './constants/modal-screen-options';
import { useLoadSentCollectiblesBalance } from './hooks/use-load-sent-collectibles-balance.hook';
import { useResetKeychainOnInstall } from './hooks/use-reset-keychain-on-install.hook';
import { useResetLoading } from './hooks/use-reset-loading.hook';
import { useShowSecurityScreen } from './hooks/use-show-security-sceen.hook';
import { useTokensPriceInfo } from './hooks/use-tokens-price-info.hook';
import { Stack } from './utils/get-stack-navigator';

export const globalNavigationRef = createRef<NavigationContainerRef<ScreensParamList>>();

export const Navigator: FC = () => {
  const { initialState, isReady, handleStateChange } = usePersistedNavigationState();
  const isAuthorised = useIsAuthorisedSelector();
  const showLoader = useShowLoaderSelector();
  const showSecurityScreen = useShowSecurityScreen();

  useLockApp(isReady);
  useTokensPriceInfo();
  useLoadSentCollectiblesBalance();
  useResetLoading();
  useAppLockTimer();
  useResetKeychainOnInstall();

  if (!isReady) {
    return <SplashScreen />;
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
              <Stack.Screen name={ScreensEnum.WalletCreated} component={WalletCreated} />
              <Stack.Screen name={ScreensEnum.Wallet} component={Wallet} />
              <Stack.Screen name={ScreensEnum.Receive} component={Receive} />
              <Stack.Screen name={ScreensEnum.Settings} component={Settings} />
              <Stack.Screen name={ScreensEnum.AccountsSettings} component={AccountsSettings} />
              <Stack.Screen name={ScreensEnum.EditAccount} component={EditAccount} />
              <Stack.Screen name={ScreensEnum.SettingsGeneral} component={SettingsGeneral} />
              <Stack.Screen name={ScreensEnum.SettingsSecurity} component={SettingsSecurity} />
              <Stack.Screen name={ScreensEnum.SettingsAboutUs} component={SettingsAboutUs} />
              <Stack.Screen name={ScreensEnum.SendToken} component={SendToken} />
              <Stack.Screen name={ScreensEnum.SendCollectible} component={SendCollectible} />
              <Stack.Screen name={ScreensEnum.Swap} component={Swap} />
              <Stack.Screen name={ScreensEnum.ConnectToDapps} component={ConnectToDapps} />
              <Stack.Screen name={ScreensEnum.Tokens} component={Tokens} />
              <Stack.Screen name={ScreensEnum.ScanQrCode} component={ScanQrCode} />
              <Stack.Screen name={ScreensEnum.Token} component={Token} />
              <Stack.Screen name={ScreensEnum.CollectiblesList} component={CollectiblesList} />
              <Stack.Screen name={ScreensEnum.SpecificCollectiblesList} component={SpecificCollectiblesList} />
              <Stack.Screen name={ScreensEnum.Activity} component={Activity} />
              <Stack.Screen name={ScreensEnum.ChangePassword} component={ChangePassword} />
              <Stack.Screen name={ScreensEnum.AuthorizedDApps} component={AuthorizedDApps} />
              <Stack.Screen name={ScreensEnum.Unlock} component={UnlockApp} />
            </Stack.Group>

            <Stack.Group screenOptions={modalScreenOptions}>
              <Stack.Screen
                name={ScreensEnum.AccountsSelector}
                options={{ title: 'My Accounts' }}
                component={AccountsSelector}
              />
              <Stack.Screen
                name={ScreensEnum.NetworksSelector}
                options={{ title: 'Networks' }}
                component={NetworksSelector}
              />
              <Stack.Screen
                name={ScreensEnum.TokensSelector}
                options={{ title: 'Select Token' }}
                component={TokensSelector}
              />
              <Stack.Screen
                name={ScreensEnum.SendCollectiblesSelector}
                options={{ title: 'Select Collectible' }}
                component={SendCollectiblesSelector}
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
                name={ScreensEnum.DAppConnectionConfirmation}
                options={{ title: 'Connect' }}
                component={DAppConnectionConfirmation}
              />
              <Stack.Screen
                name={ScreensEnum.DAppTransactionConfirmation}
                options={{ title: 'Confirm operation' }}
                component={DAppTransactionConfirmation}
              />
              <Stack.Screen
                name={ScreensEnum.DAppSignConfirmation}
                options={{ title: 'Confirm sign' }}
                component={DAppSignConfirmation}
              />
              <Stack.Screen
                name={ScreensEnum.NetworkChangeConfirmation}
                options={{ title: 'Confirm Network Change' }}
                component={NetworkChangeConfirmation}
              />
              <Stack.Screen
                name={ScreensEnum.DeleteDApp}
                options={{ title: 'Confirm disconnection' }}
                component={DeleteDApp}
              />
              <Stack.Screen
                name={ScreensEnum.WordsAmountSelector}
                options={{ title: 'Amount Words' }}
                component={WordsAmountSelector}
              />
              <Stack.Screen
                name={ScreensEnum.SettingsResetWalletConfirm}
                options={{ title: 'Reset Wallet' }}
                component={SettingsResetWalletConfirm}
              />
              <Stack.Screen
                name={ScreensEnum.SendConfirmation}
                options={{ title: 'Confirm Operation' }}
                component={SendConfirmation}
              />
              <Stack.Screen
                name={ScreensEnum.SlippageTolerance}
                options={{ title: 'Slippage Tolerance' }}
                component={SlippageSettings}
              />
              <Stack.Screen
                name={ScreensEnum.ConfirmAccess}
                options={{ title: 'Confirm Access' }}
                component={ConfirmAccess}
              />
              <Stack.Screen name={ScreensEnum.SwapRoute} options={{ title: 'Route' }} component={SwapRoute} />
            </Stack.Group>

            <Stack.Group screenOptions={modalScreenOptionsWithBackButton}>
              <Stack.Screen
                name={ScreensEnum.EditAccountName}
                options={{ title: 'Edit account' }}
                component={EditAccountName}
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
                name={ScreensEnum.ActivityFilterSelector}
                options={{ title: 'Activity Filter' }}
                component={ActivityFilterSelector}
              />
              <Stack.Screen
                name={ScreensEnum.EditPermission}
                options={{ title: 'Edit permission' }}
                component={EditPermission}
              />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name={ScreensEnum.Welcome} component={Welcome} />
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

      {showSecurityScreen && <SplashScreen />}
      {showLoader && <FullScreenLoader />}
      <ComponentWithNavigationContext />
    </NavigationContainer>
  );
};
