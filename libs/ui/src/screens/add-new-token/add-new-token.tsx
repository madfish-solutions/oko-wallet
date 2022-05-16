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

  const onContractAddressChange = (contractAddressValue: string) => setAddress(contractAddressValue);
  const onTokenNameChange = (tokenNameValue: string) => setName(tokenNameValue);
  const onTokenDecimalsChange = (tokenDecimalsValue: string) => setDecimals(tokenDecimalsValue);
  const onImageUrChange = (tokenImageUrlValue: string) => setImageUrl(tokenImageUrlValue);

  const onAddToken = () => {
    dispatch(addTokenMetadataAction({ address, name, decimals, imageUrl }));

    setAddress('');
    setName('');
    setDecimals('');
    setImageUrl('');
  };

  return (
    <View>
      <TextInput placeholder="Contract Address" value={address} onChangeText={onContractAddressChange} />
      <TextInput placeholder="Token Name" value={name} onChangeText={onTokenNameChange} />
      <TextInput placeholder="Token Decimals" value={decimals} onChangeText={onTokenDecimalsChange} />
      <TextInput placeholder="Image URL" value={imageUrl} onChangeText={onImageUrChange} />
      <Pressable onPress={onAddToken}>
        <Text>Add token</Text>
      </Pressable>
    </View>
  );
};
