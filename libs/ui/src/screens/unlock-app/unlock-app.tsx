import React, { FC, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { useUnlock } from '../../hooks/use-unlock.hook';

import { UnlockStyles } from './unlock.styles';

export const UnlockApp: FC = () => {
  const [password, setPassword] = useState('');
  const { unlock } = useUnlock();

  const onUnlock = () => unlock(password);

  return (
    <View style={UnlockStyles.root}>
      <Text style={UnlockStyles.text}> Please, write your password</Text>
      <TextInput style={UnlockStyles.input} onChangeText={setPassword} value={password} placeholder="type password" />
      <Button onPress={onUnlock} title="unlock" color="#841584" />
    </View>
  );
};
