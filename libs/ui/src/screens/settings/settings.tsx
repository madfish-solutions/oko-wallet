import React, { FC } from 'react';
import { Button } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { HeaderSideTypeEnum } from '../../components/header/enums/header-side-type.enum';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { MaximiseScreenButton } from '../../components/maximise-screen-button/maximise-screen-button';
import { ResetWallet } from '../../components/reset-wallet/reset-wallet';
import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';
import { ScreensEnum } from '../../enums/sreens.enum';
import { ToastsEnum } from '../../enums/toasts.enums';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useUnlock } from '../../hooks/use-unlock.hook';

import { Activity } from './components/activity/activity';

export const Settings: FC = () => {
  const toast = useToast();
  const { navigate } = useNavigation();
  const { lock } = useUnlock();

  const navigateToAddNewToken = () => navigate(ScreensEnum.AddNewToken);
  const navigateToManageTokens = () => navigate(ScreensEnum.ManageTokens);
  const navigateToAddNetwork = () => navigate(ScreensEnum.AddNetwork);
  const navigateToConnectToDapps = () => navigate(ScreensEnum.ConnectToDapps);

  const onShowSuccessToastClick = () =>
    toast.show('This is Success!', {
      type: ToastsEnum.success
    });
  const onShowWarningToastClick = () =>
    toast.show('This is a Warning!', {
      type: ToastsEnum.warning
    });
  const onShowErrorToastClick = () =>
    toast.show('This is an Error!', {
      type: ToastsEnum.error
    });

  return (
    <ScreenContainer
      screenTitle="Settings"
      icons={[IconNameEnum.Search, IconNameEnum.AddChain, IconNameEnum.Edit]}
      navigationType={HeaderSideTypeEnum.Icons}
    >
      <Button title="Add network" onPress={navigateToAddNetwork} />
      <Button title="Add new token" onPress={navigateToAddNewToken} />
      <Button title="Manage Tokens" onPress={navigateToManageTokens} />
      <Button title="Connect to Dapps" onPress={navigateToConnectToDapps} />
      <Button title="Show success toast" onPress={onShowSuccessToastClick} />
      <Button title="Show warning toast" onPress={onShowWarningToastClick} />
      <Button title="Show error toast" onPress={onShowErrorToastClick} />
      <ResetWallet />
      <Button onPress={lock} title="lock app" color="#841584" />
      <MaximiseScreenButton />
      <Activity />
    </ScreenContainer>
  );
};
