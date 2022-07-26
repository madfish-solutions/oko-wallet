import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '../../components/button/button';
import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';
import { TextInput } from '../../components/text-input/text-input';
import { Asset } from '../../interfaces/asset.interface';
import { sendAssetAction } from '../../store/wallet/wallet.actions';

import { styles } from './send.styles';

export const Send: FC = () => {
  const dispatch = useDispatch();
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [amount, setAmount] = useState('');
  const [receiverPublicKeyHash, setReceiverPublicKeyHash] = useState('');
  const [decimals, setDecimals] = useState('');

  const onSend = () => {
    const asset: Asset = {
      decimals: Number(decimals.trim()),
      tokenAddress: tokenAddress.trim(),
      tokenId: tokenId.trim()
    };

    dispatch(sendAssetAction.submit({ asset, amount, receiverPublicKeyHash }));
  };

  return (
    <ScreenContainer screenTitle="Send">
      <View style={styles.inputContainer}>
        <TextInput placeholder="Recipient" value={receiverPublicKeyHash} onChangeText={setReceiverPublicKeyHash} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Token Address (or leave empty if GasToken)"
          value={tokenAddress}
          onChangeText={setTokenAddress}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Token Id (or leave empty)" value={tokenId} onChangeText={setTokenId} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Amount (or leave empty for EvmNFT)" value={amount} onChangeText={setAmount} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Decimals (or leave empty for EvmNFT)" value={decimals} onChangeText={setDecimals} />
      </View>

      <Button onPress={onSend} theme="secondary" title="Send" />
    </ScreenContainer>
  );
};
