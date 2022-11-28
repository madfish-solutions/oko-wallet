import React, { FC } from 'react';
import { View } from 'react-native';

import { Button } from '../../../../../../components/button/button';
import { ButtonSizeEnum } from '../../../../../../components/button/enums';
import { ScreensEnum } from '../../../../../../enums/sreens.enum';
import { useNavigation } from '../../../../../../hooks/use-navigation.hook';
import { useAllAccountsSelector } from '../../../../../../store/wallet/wallet.selectors';
import { AccountsContainer } from '../accounts-container/accounts-container';

import { styles } from './hd-accounts.styles';

export const HdAccounts: FC = () => {
  const { navigate } = useNavigation();
  const accounts = useAllAccountsSelector();

  const navigateToRevealSeedPhrase = () => navigate(ScreensEnum.RevealSeedPhrase);

  return (
    <AccountsContainer accounts={accounts}>
      <View>
        <Button
          title="Reveal Seed Phrase"
          onPress={navigateToRevealSeedPhrase}
          size={ButtonSizeEnum.Medium}
          style={styles.button}
          styleText={styles.buttonText}
        />
      </View>
    </AccountsContainer>
  );
};
