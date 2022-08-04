import React, { FC } from 'react';
import { Button } from 'react-native';

import { HeaderSideTypeEnum } from '../../components/header/enums/header-side-type.enum';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { MaximiseScreenButton } from '../../components/maximise-screen-button/maximise-screen-button';
import { ResetWallet } from '../../components/reset-wallet/reset-wallet';
import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useToast } from '../../hooks/use-toast.hook';
import { useUnlock } from '../../hooks/use-unlock.hook';

import { Activity } from './components/activity/activity';

export const Settings: FC = () => {
  const { showSuccessToast, showErrorToast, showWarningToast } = useToast();
  const { navigate } = useNavigation();
  const { lock } = useUnlock();

  const navigateToAddNewToken = () => navigate(ScreensEnum.AddNewToken);
  const navigateToManageTokens = () => navigate(ScreensEnum.ManageTokens);
  const navigateToAddNetwork = () => navigate(ScreensEnum.AddNetwork);
  const navigateToConnectToDapps = () => navigate(ScreensEnum.ConnectToDapps);

  const onShowSuccessToastClick = () => showSuccessToast('This is Success!');
  const onShowWarningToastClick = () => showWarningToast('This is a Warning!');
  const onShowErrorToastClick = () => showErrorToast('This is an Error!');

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
