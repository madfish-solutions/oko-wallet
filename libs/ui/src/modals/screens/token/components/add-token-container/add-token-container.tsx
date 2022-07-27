import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Control, Controller, FieldErrors, UseControllerProps, UseFormSetValue } from 'react-hook-form';
import { GestureResponderEvent, Image, ScrollView, Text, View } from 'react-native';

import { IconWithBorder } from '../../../../../components/icon-with-border/icon-with-border';
import { Row } from '../../../../../components/row/row';
import { TextInput } from '../../../../../components/text-input/text-input';
import { useNavigation } from '../../../../../hooks/use-navigation.hook';
import { ModalActionContainer } from '../../../../components/modal-action-container/modal-action-container';
import { FooterButtons } from '../../../../components/modal-footer-buttons/modal-footer-buttons.interface';
import { FormTypes } from '../../types/form-types.interface';

import { styles } from './add-token-container.styles';

interface Props extends Pick<FooterButtons, 'submitTitle'> {
  screenTitle: string;
  onSubmitPress: OnEventFn<GestureResponderEvent>;
  control: Control<FormTypes, object>;
  rules: {
    commonRules: UseControllerProps['rules'];
    addressUrlRules: UseControllerProps['rules'];
  };
  errors: FieldErrors<FormTypes>;
  setValue: UseFormSetValue<FormTypes>;
  editable?: boolean;
}

export const AddTokenContainer: FC<Props> = ({
  screenTitle,
  onSubmitPress,
  submitTitle,
  control,
  children,
  rules: { commonRules, addressUrlRules },
  errors,
  editable = true
}) => {
  const { goBack } = useNavigation();

  const handlePromptNavigate = () => null;

  return (
    <ModalActionContainer
      screenTitle={screenTitle}
      submitTitle={submitTitle}
      isSubmitDisabled={Boolean(Object.keys(errors).length)}
      onSubmitPress={onSubmitPress}
      onCancelPress={goBack}
    >
      <ScrollView style={styles.root}>
        <Controller
          control={control}
          name="address"
          rules={addressUrlRules}
          render={({ field }) => (
            <TextInput
              field={field}
              label="Address"
              placeholder="Address"
              prompt="How to get Token Address?"
              handlePrompt={handlePromptNavigate}
              error={errors?.address?.message}
              containerStyle={styles.inputContainer}
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
              placeholder="address_id"
              prompt="What is Token ID?"
              handlePrompt={handlePromptNavigate}
              required={false}
              error={errors?.tokenId?.message}
              editable={editable}
              containerStyle={styles.inputContainer}
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
              prompt="Token symbol, like ‘BTC’ for Bitcoin"
              placeholder="BTC"
              error={errors?.symbol?.message}
              editable={editable}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="decimals"
          rules={commonRules}
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
          name="iconUrl"
          rules={{ ...commonRules, required: false }}
          render={({ field }) => (
            <View style={styles.textareaContainer}>
              <TextInput
                field={field}
                label="Icon URL"
                placeholder="http://cryptoicons.co/#tmpl"
                required={false}
                prompt="Image URL for token logo"
                error={errors?.iconUrl?.message}
                multiline
                inputStyle={styles.iconUrlInput}
                clearIconStyles={styles.clearIcon}
              />
              <Row style={styles.tokenImage}>
                <IconWithBorder type="quinary">
                  <Image source={{ uri: 'https://cdn.sheepfarm.io/nft/decor/img/31001.png' }} style={styles.image} />
                </IconWithBorder>
                <Text style={styles.tokenSymbol}>KLAY</Text>
              </Row>
            </View>
          )}
        />
        {children}
      </ScrollView>
    </ModalActionContainer>
  );
};
