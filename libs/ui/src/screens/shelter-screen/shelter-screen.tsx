import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { Shelter } from '../../shelter/shelter';
import { generateSeed } from '../../utils/keys.util';

import { ShelterStyles } from './shelter-screen.styles';

const KEY = 'sensetiveData';

export const ShelterScreen = () => {
  const [seed, setSeed] = useState('');
  const [readyForEncrypt, setReadyForEncrypt] = useState(false);
  const [decrypted, setDecrypt] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');

  const passwordButton = async () => {
    try {
      setReadyForEncrypt(true);
      await Shelter.saveSensitiveData({ [KEY]: seed }, newPassword);
    } catch (e) {
      console.log(e, 'failed to save seed phrase at localStorage');
    }
  };

  const decryptButton = async () => {
    try {
      Shelter.decryptSensitiveData(KEY, password).then(newDecrypted => setDecrypt(newDecrypted));
    } catch {
      console.log('Failed to decrypt seed Phrase');
    }
  };

  useEffect(() => {
    generateSeed().then(newSeed => setSeed(newSeed));
  }, []);

  return (
    <View>
      <Text>Welcome Shelter Content</Text>
      <Text>Welcome Shelter Content</Text>
      <Text>Welcome Shelter Content</Text>
      <View style={ShelterStyles.container}>
        <Text style={ShelterStyles.seedHeader}>First of all, set your password:</Text>
        <TextInput
          style={ShelterStyles.input}
          onChangeText={setNewPassword}
          value={newPassword}
          placeholder="set password"
        />
        <Button title="save password" onPress={passwordButton} />
        <Text style={ShelterStyles.seedHeader}>Randomly generated SEED:</Text>
        <Text style={ShelterStyles.seed}>{seed}</Text>
        <Text>{readyForEncrypt ? 'look at the localStorage' : 'wait for encryting...'}</Text>
        <TextInput
          style={ShelterStyles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="type password"
        />
        <Button onPress={() => decryptButton()} title="Decrypt" />
        {decrypted !== '' && <Text> DECRYPTED:</Text>}
        <Text style={ShelterStyles.seed}>{decrypted}</Text>
      </View>
    </View>
  );
};
