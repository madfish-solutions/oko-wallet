import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Control, Controller, FieldErrors, UseControllerProps, UseFormSetValue } from 'react-hook-form';
import { GestureResponderEvent, Text } from 'react-native';

import { IconNameEnum } from '../../../../../components/icon/icon-name.enum';
import { Row } from '../../../../../components/row/row';
import { TextInput } from '../../../../../components/text-input/text-input';
import { TouchableIcon } from '../../../../../components/touchable-icon/touchable-icon';
import { useNavigation } from '../../../../../hooks/use-navigation.hook';
import { ModalActionContainer } from '../../../../components/modal-action-container/modal-action-container';
import { FooterButtons } from '../../../../components/modal-footer-buttons/modal-footer-buttons.interface';
import { FormTypes } from '../../types/form-types.interface';

import { styles } from './network-container.styles';

interface Props extends Pick<FooterButtons, 'submitTitle'> {
  screenTitle: string;
  onSubmitPress: OnEventFn<GestureResponderEvent>;
  control: Control<FormTypes, object>;
  rules: {
    commonRules: UseControllerProps['rules'];
    rpcUrlRules: UseControllerProps['rules'];
    chainIdRules: UseControllerProps['rules'];
  };
  errors: FieldErrors<FormTypes>;
  setValue: UseFormSetValue<FormTypes>;
  editable?: boolean;
}

export const NetworkContainer: FC<Props> = ({
  screenTitle,
  onSubmitPress,
  submitTitle,
  control,
  children,
  rules: { commonRules, chainIdRules, rpcUrlRules },
  errors,
  editable = true
}) => {
  const { goBack } = useNavigation();

  const handlePressPrompt = () => null;
  const handlePromptNavigate = () => null;

  return (
    <ModalActionContainer
      screenTitle={screenTitle}
      submitTitle={submitTitle}
      isSubmitDisabled={Boolean(Object.keys(errors).length)}
      onSubmitPress={onSubmitPress}
      onCancelPress={goBack}
    >
      <Row style={styles.prompt}>
        <Text style={styles.text}>How to add new Network?</Text>
        <TouchableIcon name={IconNameEnum.Tooltip} onPress={handlePressPrompt} />
      </Row>

      <Controller
        control={control}
        name="name"
        rules={commonRules}
        render={({ field }) => (
          <TextInput
            field={field}
            label="Network name"
            placeholder="Network"
            error={errors?.name?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />
      <Controller
        control={control}
        name="rpcUrl"
        rules={rpcUrlRules}
        render={({ field }) => (
          <TextInput
            field={field}
            label="RPC URL"
            placeholder="https://"
            prompt="How to get RPC URL?"
            handlePrompt={handlePromptNavigate}
            error={errors?.rpcUrl?.message}
            editable={editable}
            containerStyle={styles.inputContainer}
          />
        )}
      />
      <Controller
        control={control}
        name="chainId"
        rules={chainIdRules}
        render={({ field }) => (
          <TextInput
            field={field}
            label="Chain ID"
            placeholder="Chain ID"
            error={errors?.chainId?.message}
            editable={editable}
            containerStyle={styles.inputContainer}
          />
        )}
      />
      <Controller
        control={control}
        name="blockExplorerUrl"
        rules={{ ...commonRules, required: false }}
        render={({ field }) => (
          <TextInput
            field={field}
            label="Block Explorer URL"
            placeholder="https://"
            required={false}
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
        render={({ field }) => (
          <TextInput
            field={field}
            label="Gas Token Symbol"
            placeholder="BTC"
            error={errors?.tokenSymbol?.message}
            containerStyle={styles.lastInputContainer}
          />
        )}
      />

      {children}
    </ModalActionContainer>
  );
};
