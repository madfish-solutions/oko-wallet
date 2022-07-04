import React, { FC } from 'react';
import { Button } from 'react-native';

import { HeaderSideTypeEnum } from '../../components/header/header-side-type.enum';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { ResetWallet } from '../../components/reset-wallet/reset-wallet';
import { ScreenContainer } from '../../components/screen-container/screen-container';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useUnlock } from '../../hooks/use-unlock.hook';
import { openInFullPage } from '../../utils/maximize-screen.util';
import { isWeb } from '../../utils/platform.utils';

export const Settings: FC = () => {
  const { navigate } = useNavigation();
  const { lock } = useUnlock();

  const navigateToAddNewToken = () => navigate(ScreensEnum.AddNewToken);
  const navigateToManageTokens = () => navigate(ScreensEnum.ManageTokens);
  const navigateToAddNetwork = () => navigate(ScreensEnum.AddNetwork);
  const navigateToConnectToDapps = () => navigate(ScreensEnum.ConnectToDapps);

  const handleMaximiseViewClick = () => {
    openInFullPage();
  };

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
      <ResetWallet />
      <Button onPress={lock} title="lock app" color="#841584" />
      {isWeb && <Button title="Maximize screen" onPress={handleMaximiseViewClick} color="#ffa500" />}
    </ScreenContainer>
  );
};
