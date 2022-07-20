import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text } from 'react-native';

import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { TextInput } from '../../../../components/text-input/text-input';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useAllNetworksSelector } from '../../../../store/wallet/wallet.selectors';
import { ModalActionContainer } from '../../../components/modal-action-container/modal-action-container';
import { FooterButtons } from '../../../components/modal-footer-buttons/modal-footer-buttons.interface';
import { useNetworkFieldsRules } from '../../../hooks/use-validate-network-fields.hook';
import { FormTypes } from '../types/form-types.interface';

import { styles } from './network-container.styles';

interface Props extends Pick<FooterButtons, 'submitTitle'> {
  screenTitle: string;
  onSubmitPress: OnEventFn<FormTypes>;
  defaultValues?: FormTypes;
}

const initialFormValues = {
  name: '',
  rpcUrl: '',
  chainId: '',
  blockExplorerUrl: '',
  tokenSymbol: ''
};

export const NetworkContainer: FC<Props> = ({ defaultValues, screenTitle, onSubmitPress, submitTitle, children }) => {
  const { goBack } = useNavigation();
  const networks = useAllNetworksSelector();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues: defaultValues ?? initialFormValues
  });

  const { commonRules, rpcUrlRules, chainIdRules } = useNetworkFieldsRules(networks);

  const handlePressPrompt = () => null;
  const handlePromptNavigate = () => null;

  return (
    <ModalActionContainer
      screenTitle={screenTitle}
      submitTitle={submitTitle}
      isSubmitDisabled={Boolean(Object.keys(errors).length)}
      onSubmitPress={handleSubmit(onSubmitPress)}
      onCancelPress={goBack}
    >
      <ScrollView style={styles.root}>
        <Row style={styles.prompt}>
          <Text style={styles.text}>How to add new Network?</Text>
          <TouchableIcon name={IconNameEnum.Tooltip} onPress={handlePressPrompt} />
        </Row>

        <Controller
          control={control}
          name="name"
          rules={commonRules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              label="Network name"
              placeholder="Network"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.name?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="rpcUrl"
          rules={rpcUrlRules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              label="RPC URL"
              placeholder="https://"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              prompt="How to get RPC URL?"
              handlePrompt={handlePromptNavigate}
              error={errors?.rpcUrl?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="chainId"
          rules={chainIdRules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              label="Chain ID"
              placeholder="Chain ID"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.chainId?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="blockExplorerUrl"
          rules={{ ...commonRules, required: false }}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              label="Block Explorer URL"
              placeholder="https://"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              prompt="I don’t have Block Explorer URL"
              handlePrompt={handlePromptNavigate}
              error={errors?.blockExplorerUrl?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="tokenSymbol"
          rules={commonRules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              ref={ref}
              label="Gas Token Symbol"
              placeholder="BTC"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors?.tokenSymbol?.message}
            />
          )}
        />

        {children}
      </ScrollView>
    </ModalActionContainer>
  );
};
