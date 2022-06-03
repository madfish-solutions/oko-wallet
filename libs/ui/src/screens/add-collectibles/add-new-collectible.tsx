import React, { FC, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { addTokenMetadataAction } from '../../store/wallet/wallet.actions';

import { AddNewCollectibleStyles } from './add-new-collectible.styles';

export const AddNewCollectible: FC = () => {
  const dispatch = useDispatch();
  const [tokenAddress, setTokenAddress] = useState('');
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('');
  const [thumbnailUri, seThumbnailUri] = useState('');
  const [artifactUri, setArtifactUri] = useState('');
  const [isRequired, setIsRequired] = useState(false);

  const onDecimalsChange = (decimalsValue: string) => setDecimals(decimalsValue.replace(/\D/g, ''));

  const onAddToken = () => {
    if (artifactUri) {
      dispatch(
        addTokenMetadataAction({ tokenAddress, name, symbol, thumbnailUri, artifactUri, decimals: Number(decimals) })
      );

      setTokenAddress('');
      setName('');
      setSymbol('');
      setDecimals('');
      seThumbnailUri('');
      setArtifactUri('');
    }
    setIsRequired(true);
  };

  return (
    <View>
      <NavigationBar />
      <TextInput
        style={AddNewCollectibleStyles.input}
        placeholder="Token Address"
        value={tokenAddress}
        onChangeText={setTokenAddress}
      />
      <TextInput style={AddNewCollectibleStyles.input} placeholder="Token Name" value={name} onChangeText={setName} />
      <TextInput
        style={AddNewCollectibleStyles.input}
        placeholder="Token Symbol"
        value={symbol}
        onChangeText={setSymbol}
      />
      <TextInput
        style={AddNewCollectibleStyles.input}
        placeholder="Token Decimals"
        value={decimals}
        onChangeText={onDecimalsChange}
        keyboardType="numeric"
      />
      <TextInput
        style={AddNewCollectibleStyles.input}
        placeholder="Thumbnail Uri"
        value={thumbnailUri}
        onChangeText={seThumbnailUri}
      />
      <TextInput
        style={AddNewCollectibleStyles.input}
        placeholder="artifact Uri"
        value={artifactUri}
        onChangeText={setArtifactUri}
      />
      {isRequired && <Text style={AddNewCollectibleStyles.warning}> artifact Uri is required</Text>}
      <Pressable onPress={onAddToken}>
        <Text>Add NFT</Text>
      </Pressable>
    </View>
  );
};
