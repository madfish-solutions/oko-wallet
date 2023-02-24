import { RouteProp, useRoute } from '@react-navigation/native';
import { isNotEmptyString } from '@rnw-community/shared';
import { parseUnits } from 'ethers/lib/utils';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { MAX_UINT_256_STRING } from '../../../api/1inch/constants';
import { ButtonThemesEnum } from '../../../components/button/enums';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { InfoBox } from '../../../components/info-box/info-box';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useScrollToOffset } from '../../../hooks/use-scroll-to-element.hook';
import { useTokenFiatBalance } from '../../../hooks/use-token-fiat-balance.hook';
import { ReadOnlyTokenInput } from '../../../screens/send/screens/send-token/components/read-only-token-input/read-only-token-input';
import { TokenInput } from '../../../screens/send/screens/send-token/components/token-input/token-input';
import { getEncodedApproveTokenData } from '../../../screens/send-confirmation/components/evm-confirmation/utils/get-approve-token-data.util';
import { changeApproveAllowanceDataAction } from '../../../store/swap/swap.actions';
import { eraseProtocol } from '../../../utils/string.util';
import { getFormattedAllowance } from '../../../utils/units.utils';
import { ModalActionContainer } from '../../components/modal-action-container/modal-action-container';

import { INFINITE_AMOUNT, ALLOWANCE_RULES } from './constatns';
import { styles } from './edit-permission.styles';
import { FormTypes } from './types';
import { checkIsMaxUintString } from './utils/check-is-max-uint-string.util';
import { getAllowanceInDollar } from './utils/get-allowance-amount-in-dollar.util';

export const EditPermission: FC = () => {
  const { goBack } = useNavigation();
  const {
    params: { origin, token, proposedAllowanceAmount, spender, customAllowanceAmount }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.EditPermission>>();
  const dispatch = useDispatch();
  const { scrollViewRef, scrollToOffset } = useScrollToOffset();

  const {
    control,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
    clearErrors
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues: {
      isCustomAllowanceSelected: isNotEmptyString(customAllowanceAmount),
      customAllowance: isNotEmptyString(customAllowanceAmount)
        ? getFormattedAllowance(customAllowanceAmount, token.decimals)
        : ''
    }
  });

  const isCustomLimitSelected = watch('isCustomAllowanceSelected');
  const customAllowance = watch('customAllowance');

  const customAllowanceBalance = useTokenFiatBalance(customAllowance, token);

  const onProposedLimitSelect = () => {
    setValue('isCustomAllowanceSelected', false);
    clearErrors();
  };
  const onCustomLimitSelect = () => setValue('isCustomAllowanceSelected', true);

  const onSubmit = () => {
    const allowanceToSign = isCustomLimitSelected ? customAllowance : proposedAllowanceAmount;

    const allowanceToEncode =
      isCustomLimitSelected && !checkIsMaxUintString(allowanceToSign)
        ? parseUnits(allowanceToSign, token.decimals).toHexString()
        : allowanceToSign;

    const data = getEncodedApproveTokenData(spender, allowanceToEncode);

    dispatch(changeApproveAllowanceDataAction(data));
    goBack();
  };

  useEffect(
    () => void (isNotEmptyString(errors?.customAllowance?.message) && scrollToOffset()),
    [errors?.customAllowance?.message]
  );

  const modifyCustomAllowanceField = (field: ControllerRenderProps<FormTypes, 'customAllowance'>) => ({
    ...field,
    onChange: (newValue: string) => {
      if (newValue === MAX_UINT_256_STRING) {
        onCustomLimitSelect();
      }

      field.onChange(newValue);
    },
    value: checkIsMaxUintString(field.value) ? getFormattedAllowance(MAX_UINT_256_STRING, token.decimals) : field.value
  });

  const onFocus = () => checkIsMaxUintString(customAllowance) && setValue('customAllowance', '');

  return (
    <ModalActionContainer
      screenTitle="Edit permission"
      buttonTitle="Save"
      onPress={handleSubmit(onSubmit)}
      isBackButton
      buttonTheme={ButtonThemesEnum.Secondary}
      scrollViewRef={scrollViewRef}
    >
      <InfoBox
        title="Allowance limit"
        description={`Allow ${eraseProtocol(origin)} to withdraw and spend up to the following amount:`}
      />
      <Pressable onPress={onProposedLimitSelect}>
        <Row style={styles.proposedLimit}>
          <Icon name={isCustomLimitSelected ? IconNameEnum.Circle : IconNameEnum.RadioOn} iconStyle={styles.icon} />
          <Text style={styles.fieldName}>Proposed limit</Text>
        </Row>
        <ReadOnlyTokenInput
          token={token}
          amount={getFormattedAllowance(proposedAllowanceAmount, token.decimals)}
          amountInDollar={INFINITE_AMOUNT}
        />
      </Pressable>

      <Pressable onPress={onCustomLimitSelect}>
        <Row style={styles.customField}>
          <Icon name={isCustomLimitSelected ? IconNameEnum.RadioOn : IconNameEnum.Circle} iconStyle={styles.icon} />
          <Text style={styles.fieldName}>Custom limit</Text>
        </Row>
        <Controller
          control={control}
          name="customAllowance"
          render={({ field }) => (
            <TokenInput
              field={modifyCustomAllowanceField(field)}
              token={token}
              amountInDollar={getAllowanceInDollar(customAllowance, customAllowanceBalance.amountInDollar)}
              availableBalance={MAX_UINT_256_STRING}
              availableFormattedBalance={customAllowanceBalance.availableFormattedBalance}
              maxButtonTitle="Unlimited"
              onFocus={onFocus}
              error={errors?.customAllowance?.message}
            />
          )}
          rules={ALLOWANCE_RULES}
        />
      </Pressable>
    </ModalActionContainer>
  );
};
