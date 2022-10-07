import React, { FC, useState } from 'react';
import { TextInput, Button, View } from 'react-native';

import { Text } from '../../components/text/text';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useShelter } from '../../hooks/use-shelter.hook';
import { colors } from '../../styles/colors';
import { openMaximiseScreen } from '../../utils/open-maximise-screen.util';
import { isMaximiseScreen, isWeb } from '../../utils/platform.utils';

import { styles } from './authorization.styles';

export const Authorization: FC = () => {
  const { navigate } = useNavigation();

  const [seed, setSeed] = useState('tired cousin aerobic voyage risk pink point stool dog hello april pioneer');
  const [password, setPassword] = useState('');
  const { importWallet } = useShelter();

  const handleImportAccount = () => importWallet({ seedPhrase: seed, password, hdAccountsLength: 1 });
  const handleCreateANewWallet = () => {
    navigate(ScreensEnum.CreateANewWallet);

    if (isWeb && !isMaximiseScreen) {
      openMaximiseScreen();
    }
  };

  const handleNavigateToImportWallet = () => navigate(ScreensEnum.ImportWallet);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Authorization</Text>
      <TextInput style={styles.input} onChangeText={setSeed} value={seed} placeholder="write seed phrase" />

      <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="set password" />

      <Button onPress={handleImportAccount} title="import account" color="#841584" />
      <Button onPress={handleNavigateToImportWallet} title="navigate import account" color="#841584" />
      <Button onPress={handleCreateANewWallet} title="create a new wallet" color={colors.green} />
    </View>
  );
};
