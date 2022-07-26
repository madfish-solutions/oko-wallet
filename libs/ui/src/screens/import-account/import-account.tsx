import React, { FC, useState } from 'react';
import { Text, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useShelter } from '../../hooks/use-shelter.hook';

import { ImportAccountStyles } from './import-account.styles';

export const ImportAccount: FC = () => {
  const [seed, setSeed] = useState('tired cousin aerobic voyage risk pink point stool dog hello april pioneer');
  const [password, setPassword] = useState('');
  const { importWallet } = useShelter();

  const handleImportAccount = () => importWallet({ seedPhrase: seed, password, hdAccountsLength: 1 });

  return (
    <SafeAreaView style={ImportAccountStyles.root}>
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
    </SafeAreaView>
  );
};
