/* eslint-disable prettier/prettier */
import React, { FC, useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { AccountTokenInput } from '../../interfaces/token-input.interface';
import { sendAssetAction } from '../../store/wallet/wallet.actions';
import { useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';

const styles = StyleSheet.create({
  root: {
    marginBottom: 12
  },
  title: {
    fontSize: 18,
    fontWeight: '500'
  },
  input: {
    height: 32,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#454545'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 32,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#454545'
  }
});

export const Send: FC = () => {
  const dispatch = useDispatch();
  const { name } = useSelectedNetworkSelector();
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  // *
  const [amount, setAmount] = useState('');
  const [receiverPublicKeyHash, setReceiverPublicKeyHash] = useState('');
  const [decimals, setDecimals] = useState('');

  const onSend = () => {
    const prepateAsset: AccountTokenInput = {
      name: 'Test Token',
      symbol: 'TT',
      decimals: Number(decimals),
      tokenAddress,
      tokenId
    };

    dispatch(
      sendAssetAction.submit({ asset: prepateAsset, amount, receiverPublicKeyHash })
    );
  };

  return (
    <View>
      <View style={styles.root}>
        <Text style={styles.title}>Network: {name}</Text>
      </View>
      <TextInput placeholder="Recipient" value={receiverPublicKeyHash} onChangeText={setReceiverPublicKeyHash} style={styles.input} />
      <TextInput placeholder="Token Address (or leave empty)" value={tokenAddress} onChangeText={setTokenAddress} style={styles.input} />
      <TextInput placeholder="Token Id (or leave empty)" value={tokenId} onChangeText={setTokenId} style={styles.input} />
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} style={styles.input} />
      <TextInput placeholder="!!!Decimals" value={decimals} onChangeText={setDecimals} style={styles.input} />

      <Pressable onPress={onSend} style={styles.button}>
        <Text>Send</Text>
      </Pressable>

      <NavigationBar />
    </View>
  );
};
