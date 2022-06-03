import React, { FC, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { addTokenMetadataAction } from '../../store/wallet/wallet.actions';

export const AddNewToken: FC = () => {
  const dispatch = useDispatch();
  const [tokenAddress, setTokenAddress] = useState('');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('');
  const [thumbnailUri, seThumbnailUri] = useState('');
  const [artifactUri, setArtifactUri] = useState('');
  const [tokenId, setTokenId] = useState('');

  const onDecimalsChange = (decimalsValue: string) => setDecimals(decimalsValue.replace(/\D/g, ''));

  const onAddToken = () => {
    dispatch(
      addTokenMetadataAction({
        tokenAddress,
        tokenId,
        name,
        symbol,
        thumbnailUri,
        artifactUri,
        decimals: Number(decimals)
      })
    );

    setTokenAddress('');
    setName('');
    setSymbol('');
    setDecimals('');
    seThumbnailUri('');
    setArtifactUri('');
    setTokenId('');
  };

  return (
    <View>
      <NavigationBar />
      <TextInput placeholder="Token Address" value={tokenAddress} onChangeText={setTokenAddress} />
      <TextInput placeholder="Token ID" value={tokenId} onChangeText={setTokenId} />
      <TextInput placeholder="Token Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Token Symbol" value={symbol} onChangeText={setSymbol} />
      <TextInput placeholder="Token Decimals" value={decimals} onChangeText={onDecimalsChange} keyboardType="numeric" />
      <TextInput placeholder="Thumbnail Uri" value={thumbnailUri} onChangeText={seThumbnailUri} />
      <TextInput placeholder="artifact Uri" value={artifactUri} onChangeText={setArtifactUri} />
      <Pressable onPress={onAddToken}>
        <Text>Add token</Text>
      </Pressable>
    </View>
  );
};
