import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '../../components/button/button';
import { ButtonThemesEnum } from '../../components/button/enums';
import { SecondaryScreenContainer } from '../../components/screen-container/secondary-screen-container/secondary-screen-container';
import { TextInput } from '../../components/text-input/text-input';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { Asset } from '../../interfaces/asset.interface';
import { sendAssetAction } from '../../store/wallet/wallet.actions';
import { isMobile } from '../../utils/platform.utils';

import { styles } from './send.styles';
import { FormTypes } from './types';

const defaultValues: FormTypes = {
  tokenAddress: '',
  tokenId: '',
  amount: '',
  receiverPublicKeyHash: '',
  decimals: ''
};

export const Send: FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues
  });

  const onSubmit = ({ decimals, tokenAddress, tokenId, amount, receiverPublicKeyHash }: FormTypes) => {
    const asset: Asset = {
      decimals: Number(decimals.trim()),
      tokenAddress: tokenAddress.trim(),
      tokenId: tokenId.trim()
    };

    dispatch(sendAssetAction.submit({ asset, amount, receiverPublicKeyHash }));
  };

  const navigateToScanQrCode = () => navigate(ScreensEnum.ScanQrCode);

  return (
    <SecondaryScreenContainer screenTitle="Send">
      {isMobile && <Button title="Qr Code" onPress={navigateToScanQrCode} theme={ButtonThemesEnum.Secondary} />}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="receiverPublicKeyHash"
          render={({ field }) => <TextInput field={field} placeholder="Recipient" />}
        />
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="tokenAddress"
          render={({ field }) => <TextInput field={field} placeholder="Token Address (or leave empty if GasToken)" />}
        />
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="tokenId"
          render={({ field }) => <TextInput field={field} placeholder="Token Id (or leave empty)" />}
        />
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="amount"
          render={({ field }) => <TextInput field={field} placeholder="Amount (or leave empty for EvmNFT)" />}
        />
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="decimals"
          render={({ field }) => <TextInput field={field} placeholder="Decimals (or leave empty for EvmNFT)" />}
        />
      </View>
      <Button onPress={handleSubmit(onSubmit)} theme={ButtonThemesEnum.Secondary} title="Send" />
    </SecondaryScreenContainer>
  );
};
