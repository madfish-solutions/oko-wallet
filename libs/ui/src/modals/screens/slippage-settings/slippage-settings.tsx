import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Warning } from '../../../components/announcement/components/warning/warning';
import { FragmentSelector } from '../../../components/fragment-selector/fragment-selector';
import { Text } from '../../../components/text/text';
import { TextInput } from '../../../components/text-input/text-input';
import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { setSlippageToleranceAction } from '../../../store/swap/swap.actions';
import { useSlippageToleranceSelector } from '../../../store/swap/swap.selectors';
import { ModalActionsContainer } from '../../components/modal-actions-container/modal-actions-container';

import { slippageOptions, ownSlippageRules, OWN } from './constatns';
import { styles } from './slippage-settings.styles';
import { FormTypes } from './types';
import { findSlippageOption } from './utils/find-slippage-option.util';

export const SlippageSettings: FC = () => {
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();
  const slippageTolerance = useSlippageToleranceSelector();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues: {
      slippageOption: findSlippageOption(slippageTolerance),
      slippageInput: slippageTolerance
    }
  });

  const slippageOption = watch('slippageOption');
  const slippageInput = watch('slippageInput');

  const isOwnSlippageSelected = slippageOption.title === OWN;
  const showWarning = isOwnSlippageSelected && Number(slippageInput) >= 4 && Number(slippageInput) <= 50;
  const isSubmitDisabled = Object.keys(errors).length > 0;

  const onSelect = (option: { title: string; value: string }) => {
    setValue('slippageOption', option);

    if (option.title !== OWN) {
      setValue('slippageInput', option.value, { shouldValidate: true });
    }
  };

  const onSubmit = (fields: FormTypes) => {
    dispatch(
      setSlippageToleranceAction(
        isOwnSlippageSelected ? Number(fields.slippageInput).toString() : fields.slippageOption.value
      )
    );
    navigate(ScreensEnum.Swap);
  };

  return (
    <ModalActionsContainer
      screenTitle="Slippage Tolerance"
      submitTitle="Save"
      onSubmitPress={handleSubmit(onSubmit)}
      onCancelPress={goBack}
      isSubmitDisabled={isSubmitDisabled}
    >
      <>
        <Text style={styles.settings}>Slippage Settings</Text>
        <Text style={styles.description}>
          If the price changes unfavorably more than the rate below, your trade will be canceled
        </Text>
        <View style={styles.selectorBlock}>
          <FragmentSelector options={slippageOptions} selectedItem={slippageOption} onSelect={onSelect} />
        </View>
        {isOwnSlippageSelected && (
          <Controller
            control={control}
            name="slippageInput"
            rules={ownSlippageRules}
            render={({ field }) => (
              <TextInput
                field={field}
                placeholder="0"
                keyboardType="numeric"
                error={errors?.slippageInput?.message}
                decimals={2}
                containerStyle={styles.inputContainer}
              />
            )}
          />
        )}

        {showWarning && (
          <Warning text={`You may receive ${slippageInput}% less with this level of slippage tolerance`} />
        )}
      </>
    </ModalActionsContainer>
  );
};
