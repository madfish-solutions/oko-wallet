import React, { FC, useState } from 'react';
import { TextInput, Pressable, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { HeaderSideTypeEnum } from '../../components/header/enums/header-side-type.enum';
import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';
import { sendAssetAction } from '../../store/wallet/wallet.actions';
import { useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';

export const Send: FC = () => {
  const dispatch = useDispatch();
  const {
    gasTokenMetadata: { name }
  } = useSelectedNetworkSelector();
  const [amount, setAmount] = useState('');
  const [receiverPublicKeyHash, setReceiverPublicKeyHash] = useState('');

  const onSend = () => dispatch(sendAssetAction.submit({ amount, receiverPublicKeyHash }));

  return (
    <ScreenContainer screenTitle="Send" navigationType={HeaderSideTypeEnum.TokenInfo}>
      <Text>You can send Gas Token: {name}</Text>
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} />
      <TextInput placeholder="Recipient" value={receiverPublicKeyHash} onChangeText={setReceiverPublicKeyHash} />
      <Pressable onPress={onSend}>
        <Text>Send</Text>
      </Pressable>
    </ScreenContainer>
  );
};
