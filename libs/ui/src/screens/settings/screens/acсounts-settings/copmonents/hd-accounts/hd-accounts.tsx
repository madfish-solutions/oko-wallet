import React, { FC } from 'react';
import { View } from 'react-native';

import { Button } from '../../../../../../components/button/button';
import { useAllAccountsSelector } from '../../../../../../store/wallet/wallet.selectors';
import { AccountsContainer } from '../accounts-container/accounts-container';

import { styles } from './hd-accounts.styles';

export const HdAccounts: FC = () => {
  const accounts = useAllAccountsSelector();

  return (
    <AccountsContainer accounts={accounts}>
      <View style={styles.button}>
        <Button title="Reveal Seed Phrase" styleText={styles.buttonText} />
      </View>
    </AccountsContainer>
  );
};
