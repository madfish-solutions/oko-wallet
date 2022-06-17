import React, { FC } from 'react';
import { Button } from 'react-native';

import { ResetWallet } from '../../components/reset-wallet/reset-wallet';
import { ScreenContainer } from '../../components/screen-container/screen-container';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useUnlock } from '../../hooks/use-unlock.hook';

export const Settings: FC = () => {
  const { navigate } = useNavigation();
  const { lock } = useUnlock();

  const navigateToAddNewToken = () => navigate(ScreensEnum.AddNewToken);
  const navigateToManageTokens = () => navigate(ScreensEnum.ManageTokens);
  const navigateToAddNetwork = () => navigate(ScreensEnum.AddNetwork);

  return (
    <ScreenContainer screenTitle="Settings">
      <Button title="Add network" onPress={navigateToAddNetwork} />
      <Button title="Add new token" onPress={navigateToAddNewToken} />
      <Button title="Manage Tokens" onPress={navigateToManageTokens} />
      <ResetWallet />
      <Button onPress={lock} title="lock app" color="#841584" />
    </ScreenContainer>
  );
};
