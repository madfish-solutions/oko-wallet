/* eslint-disable prettier/prettier */
import React, { FC, useState } from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { TEZOS_CHAIN_ID, TOKENS_DEFAULT_LIST } from '../../constants/tokens';
import { sendAssetAction } from '../../store/wallet/wallet.actions';
import { useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';

// Get QUIPU metadata
const metadata = TOKENS_DEFAULT_LIST[TEZOS_CHAIN_ID][1];

export const Send: FC = () => {
  const dispatch = useDispatch();
  const {
    gasTokenMetadata: { name }
  } = useSelectedNetworkSelector();
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  // *
  const [amount, setAmount] = useState('');
  const [receiverPublicKeyHash, setReceiverPublicKeyHash] = useState('');

  const onSend = () => {
    dispatch(
      sendAssetAction.submit({ asset: metadata, amount, receiverPublicKeyHash })
    );
  };

  return (
    <View>
      <NavigationBar />
      <Text>You can send Gas Token: {name}</Text>
      <TextInput placeholder="Token Address" value={tokenAddress} onChangeText={setTokenAddress} />
      <TextInput placeholder="Token Id" value={tokenId} onChangeText={setTokenId} />
      {/* * */}
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} />
      <TextInput placeholder="Recipient" value={receiverPublicKeyHash} onChangeText={setReceiverPublicKeyHash} />
      <Pressable onPress={onSend}>
        <Text>Send</Text>
      </Pressable>
    </View>
  );
};
