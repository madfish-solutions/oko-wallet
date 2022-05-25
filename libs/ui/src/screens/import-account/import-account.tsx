import React, { FC, useState } from 'react';
import { View, Text, Pressable, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { useShelter } from '../../hooks/use-shelter.hook';
import { useUnlock } from '../../hooks/use-unlock.hook';
import { resetApplicationAction } from '../../store/root-state.actions';
import { useSelectedAccountSelector } from '../../store/wallet/wallet.selectors';

import { ImportAccountStyles } from './import-account.styles';

interface Props {
  handleAuthorisation: () => void;
}

export const ImportAccount: FC<Props> = ({ handleAuthorisation }) => {
  const [seed, setSeed] = useState('');
  const [password, setPassword] = useState('');
  const { importWallet } = useShelter();
  const { unlock, lock, isLocked } = useUnlock();
  const { publicKey, publicKeyHash } = useSelectedAccountSelector();
  const dispatch = useDispatch();

  const handleImportAccount = () => importWallet({ seedPhrase: seed, password, hdAccountsLength: 2 });

  const handleLockApp = () => {
    setPassword('');
    lock();
  };

  const handleResetWallet = () => {
    dispatch(resetApplicationAction.submit());
    setPassword('');
    setSeed('');
  };

  return (
    <View>
      <Pressable onPress={handleAuthorisation}>
        <Text>Get Authorisation</Text>
      </Pressable>

      {publicKey === '' && (
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
      )}
      {publicKey !== '' && !isLocked && (
        <View style={ImportAccountStyles.view}>
          <Text> your address is {publicKeyHash} </Text>
          <Button onPress={handleLockApp} title="lock app" color="#841584" />
        </View>
      )}
      {publicKey !== '' && isLocked && (
        <View style={ImportAccountStyles.view}>
          <Text> Please, write your password</Text>
          <TextInput
            style={ImportAccountStyles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="type password"
          />
          <Button
            onPress={() => {
              unlock(password);
            }}
            title="unlock"
            color="#841584"
          />
        </View>
      )}
      <View style={ImportAccountStyles.button}>
        <Button onPress={handleResetWallet} title="reset wallet" color="#00008B" />
      </View>
    </View>
  );
};
