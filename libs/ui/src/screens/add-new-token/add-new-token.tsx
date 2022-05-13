import React, { FC, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { addTokenMetadataAction } from '../../store/wallet/wallet.actions';

export const AddNewToken: FC = () => {
  const dispatch = useDispatch();
  const [contractAddress, setContractAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const onContractAddressChange = (contractAddressValue: string) => setContractAddress(contractAddressValue);
  const onTokenNameChange = (tokenNameValue: string) => setTokenName(tokenNameValue);
  const onTokenDecimalsChange = (tokenDecimalsValue: string) => setTokenDecimals(tokenDecimalsValue);
  const onImageUrChange = (tokenImageUrlValue: string) => setImageUrl(tokenImageUrlValue);

  const onAddToken = () => {
    dispatch(
      addTokenMetadataAction({ tokenAddress: contractAddress, name: tokenName, decimals: tokenDecimals, url: imageUrl })
    );

    setContractAddress('');
    setTokenName('');
    setTokenDecimals('');
    setImageUrl('');
  };

  return (
    <View>
      <TextInput placeholder="Contract Address" value={contractAddress} onChangeText={onContractAddressChange} />
      <TextInput placeholder="Token Name" value={tokenName} onChangeText={onTokenNameChange} />
      <TextInput placeholder="Token Decimals" value={tokenDecimals} onChangeText={onTokenDecimalsChange} />
      <TextInput placeholder="Image URL" value={imageUrl} onChangeText={onImageUrChange} />
      <Pressable onPress={onAddToken}>
        <Text>Add token</Text>
      </Pressable>
    </View>
  );
};
