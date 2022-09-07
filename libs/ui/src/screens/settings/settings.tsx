import React, { FC } from 'react';
import { Button } from 'react-native';

import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { MaximiseScreenButton } from '../../components/maximise-screen-button/maximise-screen-button';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { ResetWallet } from '../../components/reset-wallet/reset-wallet';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useToast } from '../../hooks/use-toast.hook';
import { useUnlock } from '../../hooks/use-unlock.hook';

import { Activity } from './components/activity/activity';
import { HeaderSideIcons } from './components/header-side-icons/header-side-icons';

export const Settings: FC = () => {
  const { showSuccessToast, showErrorToast, showWarningToast } = useToast();
  const { navigate } = useNavigation();
  const { lock } = useUnlock();

  const navigateToAddNetwork = () => navigate(ScreensEnum.AddNetwork);
  const navigateToConnectToDapps = () => navigate(ScreensEnum.ConnectToDapps);
  const navigateToWallet = () => navigate(ScreensEnum.Wallet);

  const onShowSuccessToastClick = () => showSuccessToast('This is Success!');
  const onShowWarningToastClick = () => showWarningToast('This is a Warning!');
  const onShowErrorToastClick = () => showErrorToast('This is an Error!');

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Settings" onBackButtonPress={navigateToWallet} />
        <HeaderSideIcons icons={[IconNameEnum.Search, IconNameEnum.AddChain, IconNameEnum.Edit]} />
      </HeaderContainer>

      <ScreenScrollView>
        <Button title="Add network" onPress={navigateToAddNetwork} />
        <Button title="Connect to Dapps" onPress={navigateToConnectToDapps} />
        <Button title="Show success toast" onPress={onShowSuccessToastClick} />
        <Button title="Show warning toast" onPress={onShowWarningToastClick} />
        <Button title="Show error toast" onPress={onShowErrorToastClick} />
        <ResetWallet />
        <Button onPress={lock} title="lock app" color="#841584" />
        <MaximiseScreenButton />
        <Activity />
      </ScreenScrollView>

      <NavigationBar />
    </ScreenContainer>
  );
};
