import React, { FC } from 'react';
import { View } from 'react-native';
import { AccountInterface } from 'shared';

import { Text } from '../../../../../../components/text/text';
import { SelectedAccount } from '../../../../../send/components/selected-account/selected-account';
import { styles } from '../../confirmation.styles';

interface Props {
  account: AccountInterface;
}

export const FromAccount: FC<Props> = ({ account }) => (
  <View style={styles.container}>
    <Text style={styles.title}>From</Text>
    <SelectedAccount account={account} isDisabled />
  </View>
);
