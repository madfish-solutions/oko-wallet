import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { hashPassword } from '../../sha256/generateHash';
import { generateSeed } from '../../utils/keys.util';
import { encrypt, decrypt, setStoredValue } from '../../utils/shelter.util';

import { ShelterStyles } from './shelter-screen.styles';

const SEED_PHRASE_KEY = 'seedPhrase';
const PASSWORD_HASH = 'passwordHash';

export const ShelterScreen = () => {
  const [seed, setSeed] = useState('');
  const [readyForEncrypt, setReadyForEncrypt] = useState(false);

  const [decrypted, setDecrypt] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [password, setPassword] = useState('');

  const passwordButton = async () => {
    const hash = await hashPassword(newPassword);
    try {
      await setStoredValue(PASSWORD_HASH, hash);
      setReadyForEncrypt(true);
      const encrypted = await encrypt(seed, hash);
      await setStoredValue(SEED_PHRASE_KEY, JSON.stringify(encrypted));
    } catch (e) {
      console.log(e, 'failed to save passwordHash at localStorage');
    }
  };

  const dectyptButton = async () => {
    const passwordHash = localStorage.getItem(PASSWORD_HASH);
    const hashedInputPassword = await hashPassword(password);
    if (passwordHash === hashedInputPassword) {
      decrypt(passwordHash, SEED_PHRASE_KEY).then(decryptedSeed => setDecrypt(decryptedSeed));
    }
  };

  useEffect(() => {
    generateSeed().then(newSeed => setSeed(newSeed));
  }, []);

  return (
    <View>
      <NavigationBar />
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
        <Button onPress={() => dectyptButton()} title="Decrypt" />
        {decrypted !== '' && <Text> DECRYPTED:</Text>}
        <Text style={ShelterStyles.seed}>{decrypted}</Text>
      </View>
    </View>
  );
};
