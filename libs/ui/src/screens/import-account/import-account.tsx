import React, { FC, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { useShelter } from '../../hooks/use-shelter.hook';

import { ImportAccountStyles } from './import-account.styles';

export const ImportAccount: FC = () => {
  const [seed, setSeed] = useState('');
  const [password, setPassword] = useState('');
  const { importWallet } = useShelter();

  const handleImportAccount = () => importWallet({ seedPhrase: seed, password, hdAccountsLength: 2 });

  return (
    <View>
      <View style={ImportAccountStyles.view}>
        <Text> IMPORT ACCOUNT </Text>
        <TextInput
          style={ImportAccountStyles.input}
          onChangeText={setSeed}
          value={seed}
          placeholder="write seed phrase"
        />

        <TextInput
          style={ImportAccountStyles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="set password"
        />

        <Button onPress={handleImportAccount} title="import account" color="#841584" />
      </View>
    </View>
  );
};
