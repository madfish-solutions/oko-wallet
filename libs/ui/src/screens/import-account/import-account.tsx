import React, { FC, useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, Button, Dimensions } from 'react-native';

import { useShelter } from '../../hooks/use-shelter.hook';
import { useUnlock } from '../../hooks/use-unlock.hook';
import { useIsUnlockedSelector } from '../../store/app-info/app-info.selectors';
import { useSelectedAccount } from '../../store/wallet/wallet.selectors';

import { ImportAccountProps } from './types';

export const ImportAccount: FC<ImportAccountProps> = ({ handleAuthorisation }) => {
  const [seed, setSeed] = useState('');
  const [password, setPassword] = useState('');
  const { importWallet } = useShelter();
  const { unlock, lock } = useUnlock();
  const isUnlocked = useIsUnlockedSelector();
  const { publicKey, publicKeyHash } = useSelectedAccount();

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10
    },
    view: {
      display: 'flex',
      marginTop: 40,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

  return (
    <View>
      <Pressable onPress={handleAuthorisation}>
        <Text>Get Authorisation</Text>
      </Pressable>

      {publicKey === '' && (
        <View style={styles.view}>
          <Text> IMPORT ACCOUNT </Text>
          <TextInput style={styles.input} onChangeText={setSeed} value={seed} placeholder="write seed phrase" />

          <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="set password" />

          <Button
            onPress={() => {
              importWallet({ seedPhrase: seed, password, hdAccountsLength: 1 });
            }}
            title="import account"
            color="#841584"
          />
        </View>
      )}
      {publicKey !== '' && isUnlocked && (
        <View style={styles.view}>
          <Text> your address is {publicKeyHash} </Text>
          <Button
            onPress={() => {
              setPassword('');
              lock();
            }}
            title="lock app"
            color="#841584"
          />
        </View>
      )}
      {publicKey !== '' && !isUnlocked && (
        <View style={styles.view}>
          <Text> Please, write your password</Text>
          <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="type password" />
          <Button
            onPress={() => {
              unlock(password);
            }}
            title="unlock"
            color="#841584"
          />
        </View>
      )}
    </View>
  );
};
