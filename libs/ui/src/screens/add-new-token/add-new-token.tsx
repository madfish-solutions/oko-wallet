import React, { FC, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { addTokenMetadataAction } from '../../store/wallet/wallet.actions';

export const AddNewToken: FC = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [decimals, setDecimals] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const onDecimalsChange = (decimalsValue: string) => setDecimals(decimalsValue.replace(/\D/g, ''));

  const onAddToken = () => {
    dispatch(addTokenMetadataAction({ address, name, decimals: Number(decimals), imageUrl }));

    setAddress('');
    setName('');
    setDecimals('');
    setImageUrl('');
  };

  return (
    <View>
      <TextInput placeholder="Contract Address" value={address} onChangeText={setAddress} />
      <TextInput placeholder="Token Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Token Decimals" value={decimals} onChangeText={onDecimalsChange} keyboardType="numeric" />
      <TextInput placeholder="Image URL" value={imageUrl} onChangeText={setImageUrl} />
      <Pressable onPress={onAddToken}>
        <Text>Add token</Text>
      </Pressable>
    </View>
  );
};
