import { OnEventFn } from '@rnw-community/shared';
import isEmpty from 'lodash/isEmpty';
import React, { FC, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Linking, View } from 'react-native';

import { CopyText } from '../../../../components/copy-text/copy-text';
import { Divider } from '../../../../components/divider/divider';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { InfoBox } from '../../../../components/info-box/info-box';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { TextInput } from '../../../../components/text-input/text-input';
import { TouchableIcon } from '../../../../components/touchable-icon/touchable-icon';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { DAppInfo } from '../../../../interfaces/dapp-info.interface';
import { Token } from '../../../../interfaces/token.interface';
import { ModalActionsContainer } from '../../../../modals/components/modal-actions-container/modal-actions-container';
import { DAppHeader } from '../../../../modals/screens/d-app-connection-confirmation/d-app-header/d-app-header';
import {
  useGasTokenSelector,
  useSelectedAccountSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { formatUnitsToString, getFormattedAllowance } from '../../../../utils/units.utils';
import { SelectedAccount } from '../../../send/components/selected-account/selected-account';
import { useTransactionSpeed } from '../../hooks/use-transaction-speed.hook';
import { Field } from '../confirmation/components/field/field';
import { TransactionSpeed } from '../confirmation/components/transaction-speed/transaction-speed';
import { ownGasFeeRules } from '../confirmation/constants';
import { ConfirmOperationParams } from '../evm-confirmation/types';
import { getDecodedApproveTokenData } from '../evm-confirmation/utils/get-approve-token-data.util';

import { styles } from './approve-token.styles';

interface Props extends ConfirmOperationParams {
  token: Token;
  dAppInfo: DAppInfo;
  data: string;
}

export const ApproveToken: FC<Props> = ({
  token,
  dAppInfo,
  data,
  confirmOperationParams: { initialTransactionFee, onSend, isFeeLoading, isTransactionLoading }
}) => {
  const { goBack, navigate } = useNavigation();
  const account = useSelectedAccountSelector();
  const { explorerUrl } = useSelectedNetworkSelector();
  const gasToken = useGasTokenSelector();

  const { spender, allowanceAmount } = useMemo(() => getDecodedApproveTokenData(data), [data]);
  const proposedAllowanceAmount = useMemo(() => allowanceAmount, []);

  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ownGasFee: ''
    }
  });

  const isConfirmButtonDisabled = !isEmpty(errors) || isTransactionLoading || isFeeLoading;

  const ownGasFee = watch('ownGasFee');

  const {
    isOwnSpeedSelected,
    correctedTransactionFee,
    gasPriceCoefficient,
    isKlaytnNetwork,
    initialTransactionFeeWithDecimals,
    handleSpeedChange,
    speed,
    scrollViewRef,
    isGasPickerSelected,
    onGasFeePress
  } = useTransactionSpeed(ownGasFee, initialTransactionFee, clearErrors as OnEventFn<void>);

  useEffect(
    () => setValue('ownGasFee', formatUnitsToString(initialTransactionFee, gasToken.decimals)),
    [initialTransactionFee]
  );

  const onConfirmPress = () => onSend(gasPriceCoefficient);

  const goToExplorer = () => Linking.openURL(`${explorerUrl}/address/${spender}`);

  const navigateToEditPermission = () =>
    navigate(ScreensEnum.EditPermission, {
      origin: dAppInfo.origin,
      token,
      proposedAllowanceAmount,
      customAllowanceAmount: proposedAllowanceAmount === allowanceAmount ? '' : allowanceAmount,
      spender
    });

  return (
    <ModalActionsContainer
      screenTitle="Approve token"
      submitTitle="Confirm"
      cancelTitle="Decline"
      onCancelPress={goBack}
      onSubmitPress={handleSubmit(onConfirmPress)}
      isSubmitDisabled={isConfirmButtonDisabled}
      scrollViewRef={scrollViewRef}
      isBackButton={false}
    >
      <DAppHeader favicon={dAppInfo.favicon} origin={dAppInfo.origin} />

      <SelectedAccount account={account} isDisabled />

      <InfoBox
        title={`Give permission to access your ${token.symbol}?`}
        description="By granting permission, you are allowing the following account to access your funds"
        style={styles.permission}
      />

      <Row style={styles.spaceBetween}>
        <Text style={styles.fieldTitle}>Granted to</Text>

        <Row>
          <CopyText text={spender} />
          <TouchableIcon name={IconNameEnum.Tooltip} onPress={goToExplorer} style={styles.icon} />
        </Row>
      </Row>

      <Divider style={styles.divider} />

      <Field
        title="Approved amount"
        amount={Number(getFormattedAllowance(allowanceAmount, token.decimals))}
        symbol={token.symbol}
        iconName={IconNameEnum.EditSmall}
        onIconPress={navigateToEditPermission}
      />

      <Divider style={styles.divider} />

      <Field
        title="Max Gas fee"
        amount={correctedTransactionFee}
        symbol={gasToken.symbol}
        loading={isFeeLoading}
        {...(!isKlaytnNetwork && {
          iconName: isGasPickerSelected ? IconNameEnum.ChevronUp : IconNameEnum.Chevron,
          onIconPress: onGasFeePress
        })}
      />

      {!isKlaytnNetwork && isGasPickerSelected && (
        <View style={styles.transactionSpeed}>
          <TransactionSpeed
            speed={speed}
            handleSpeedChange={handleSpeedChange}
            initialTransactionFeeWithDecimals={initialTransactionFeeWithDecimals}
            ownGasFee={ownGasFee}
          />
          {isOwnSpeedSelected && (
            <Controller
              control={control}
              name="ownGasFee"
              rules={ownGasFeeRules}
              render={({ field }) => (
                <TextInput
                  field={field}
                  placeholder={`${initialTransactionFeeWithDecimals ?? 0}`}
                  keyboardType="numeric"
                  error={errors?.ownGasFee?.message}
                  decimals={gasToken.decimals}
                />
              )}
            />
          )}
        </View>
      )}
    </ModalActionsContainer>
  );
};
