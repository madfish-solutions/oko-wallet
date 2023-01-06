import { isDefined, isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Control, Controller, FieldErrors, UseControllerProps } from 'react-hook-form';
import { GestureResponderEvent, ScrollView, View } from 'react-native';

import { TextInput } from '../../../../../components/text-input/text-input';
import { Token } from '../../../../../components/token/token';
import { useNavigation } from '../../../../../hooks/use-navigation.hook';
import { ModalActionContainer } from '../../../../components/modal-action-container/modal-action-container';
import { FooterButtons } from '../../../../components/modal-footer-buttons/modal-footer-buttons.interface';
import { TokenFormTypes } from '../../types/form-types.interface';

import { styles } from './token-container.styles';

interface Props extends Pick<FooterButtons, 'submitTitle'> {
  screenTitle: string;
  onSubmitPress: OnEventFn<GestureResponderEvent>;
  control: Control<TokenFormTypes, object>;
  rules: {
    commonRules: UseControllerProps['rules'];
    addressUrlRules: UseControllerProps['rules'];
    thumbnailUrlRules: UseControllerProps['rules'];
    decimalsRules: UseControllerProps['rules'];
  };
  errors: FieldErrors<TokenFormTypes>;
  symbol: string;
  editable?: boolean;
  isLoadingMetadata?: boolean;
}

export const TokenContainer: FC<Props> = ({
  screenTitle,
  onSubmitPress,
  submitTitle,
  symbol,
  control,
  children,
  rules: { commonRules, addressUrlRules, thumbnailUrlRules, decimalsRules },
  errors,
  editable = true,
  isLoadingMetadata = false
}) => {
  const { goBack } = useNavigation();

  return (
    <ModalActionContainer
      screenTitle={screenTitle}
      submitTitle={submitTitle}
      isSubmitDisabled={Boolean(Object.keys(errors).length) || isLoadingMetadata}
      onSubmitPress={onSubmitPress}
      onCancelPress={goBack}
    >
      <ScrollView style={styles.root}>
        <Controller
          control={control}
          name="tokenAddress"
          rules={addressUrlRules}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Address"
              placeholder="Address"
              prompt="Enter the token address"
              error={errors?.tokenAddress?.message}
              containerStyle={styles.inputContainer}
              editable={editable}
            />
          )}
        />
        <Controller
          control={control}
          name="tokenId"
          rules={{ ...commonRules, required: false }}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Token ID"
              placeholder="0"
              prompt="Enter the token ID"
              required={false}
              error={errors?.tokenId?.message}
              containerStyle={styles.inputContainer}
              editable={editable}
            />
          )}
        />
        <Controller
          control={control}
          name="symbol"
          rules={commonRules}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Symbol"
              prompt="Token symbol, like ‘ETH’ for Ethereum"
              placeholder="ETH"
              error={errors?.symbol?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="name"
          rules={commonRules}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Name"
              prompt="Token name, like ‘Ethereum’ for ETH"
              placeholder="Ethereum"
              error={errors?.name?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="decimals"
          rules={decimalsRules}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Decimal"
              placeholder="0"
              prompt="A number of decimal places after point"
              error={errors?.decimals?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="thumbnailUri"
          rules={{ ...thumbnailUrlRules, required: false }}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Icon URL"
              placeholder="http://cryptoicons.co/#tmpl"
              required={false}
              prompt="Image URL for token logo"
              error={errors?.thumbnailUri?.message}
            >
              <View style={styles.tokenContainer}>
                <Token
                  symbol={isNotEmptyString(field.value) && isDefined(field.value) && symbol ? symbol : 'TOKEN'}
                  uri={field.value}
                  forceHideTokenName
                />
              </View>
            </TextInput>
          )}
        />
        {children}
      </ScrollView>
    </ModalActionContainer>
  );
};
