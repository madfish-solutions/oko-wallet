import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Warning } from '../../../components/announcement/components/warning/warning';
import { SpeedSelector } from '../../../components/speed-selector/speed-selector';
import { TextInput } from '../../../components/text-input/text-input';
import { Text } from '../../../components/text/text';
import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { setSlippageToleranceAction } from '../../../store/settings/settings.actions';
import { useSlippageToleranceSelector } from '../../../store/settings/settings.selectors';
import { ModalActionContainer } from '../../components/modal-action-container/modal-action-container';

import { slippageOptions, ownSlippageRules, OWN } from './constatns';
import { styles } from './slippage-settings.styles';
import { findSlippageOption } from './utils/find-slippage-option.util';

export const SlippageSettings: FC = () => {
  const dispatch = useDispatch();
  const { goBack, navigate } = useNavigation();
  const slippageTolerance = useSlippageToleranceSelector();

  const [slippage, setSlippage] = useState(findSlippageOption(slippageTolerance));

  const {
    control,
    formState: { errors },
    handleSubmit,
    clearErrors,
    watch
  } = useForm<{ ownSlippage: string }>({
    mode: 'onChange',
    defaultValues: {
      ownSlippage: slippageTolerance
    }
  });
  const ownSlippageTolerance = watch('ownSlippage');

  const isOwnSlippageSelected = slippage.title === OWN;
  const showWarning = isOwnSlippageSelected && Number(ownSlippageTolerance) >= 4 && Number(ownSlippageTolerance) <= 50;
  const isSubmitDisabled = Object.keys(errors).length > 0;

  const onSelect = (option: { title: string; value: string }) => {
    setSlippage(option);

    if (option.value !== OWN) {
      clearErrors();
    }
  };

  const onSubmit = ({ ownSlippage }: { ownSlippage: string }) => {
    dispatch(setSlippageToleranceAction(isOwnSlippageSelected ? Number(ownSlippage).toString() : slippage.value));
    navigate(ScreensEnum.Swap);
  };

  return (
    <ModalActionContainer
      screenTitle="Slippage Tolerance"
      submitTitle="Save"
      onSubmitPress={handleSubmit(onSubmit)}
      onCancelPress={goBack}
      isSubmitDisabled={isSubmitDisabled}
    >
      <View>
        <Text style={styles.settings}>Slippage Settings</Text>
        <Text style={styles.description}>
          If the price changes unfavorably more than the rate below, your trade will be canceled
        </Text>
        <View style={styles.selectorBlock}>
          <SpeedSelector options={slippageOptions} selectedItem={slippage} onSelect={onSelect} />
        </View>
        {isOwnSlippageSelected && (
          <Controller
            control={control}
            name="ownSlippage"
            rules={ownSlippageRules}
            render={({ field }) => (
              <TextInput
                field={field}
                placeholder="0"
                keyboardType="numeric"
                error={errors?.ownSlippage?.message}
                decimals={2}
              />
            )}
          />
        )}

        {showWarning && (
          <Warning
            text={`You may receive ${ownSlippageTolerance}% less with this level of slippage tolerance`}
            style={styles.warning}
          />
        )}
      </View>
    </ModalActionContainer>
  );
};
