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
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [artifactUri, setArtifactUri] = useState('');
  const [tezosTokenType, setTezosTokenType] = useState('');

  const onDecimalsChange = (decimalsValue: string) => setDecimals(decimalsValue.replace(/\D/g, ''));

  const onAddToken = () => {
    dispatch(
      addTokenMetadataAction({
        tokenAddress,
        name,
        symbol,
        thumbnailUri,
        decimals: Number(decimals),
        tokenId: tokenId || undefined,
        artifactUri: artifactUri || undefined,
        tezosTokenType: tezosTokenType || undefined
      })
    );

    setTokenAddress('');
    setName('');
    setSymbol('');
    setDecimals('');
    setThumbnailUri('');
    setTokenId('');
    setArtifactUri('');
    setTezosTokenType('');
  };

  return (
    <View>
      <NavigationBar />
      <TextInput placeholder="Token Address" value={tokenAddress} onChangeText={setTokenAddress} />
      <TextInput placeholder="Token Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Token Symbol" value={symbol} onChangeText={setSymbol} />
      <TextInput placeholder="Token Decimals" value={decimals} onChangeText={onDecimalsChange} keyboardType="numeric" />
      <TextInput placeholder="Thumbnail Uri" value={thumbnailUri} onChangeText={setThumbnailUri} />
      <TextInput placeholder="Token Id" value={tokenId} onChangeText={setTokenId} />
      <TextInput placeholder="Artifact Uri" value={artifactUri} onChangeText={setArtifactUri} />
      <TextInput placeholder="Token type (for Tezos)" value={tezosTokenType} onChangeText={setTezosTokenType} />
      <Pressable onPress={onAddToken}>
        <Text>Add token</Text>
      </Pressable>
    </View>
  );
};
