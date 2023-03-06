import { OnEventFn } from '@rnw-community/shared';
import isEmpty from 'lodash/isEmpty';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, View } from 'react-native';

import { Column } from '../../../../components/column/column';
import { Divider } from '../../../../components/divider/divider';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { TextInput } from '../../../../components/text-input/text-input';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Token } from '../../../../interfaces/token.interface';
import { ModalActionsContainer } from '../../../../modals/components/modal-actions-container/modal-actions-container';
import { useSlippageToleranceSelector } from '../../../../store/swap/swap.selectors';
import { useGasTokenSelector, useSelectedAccountSelector } from '../../../../store/wallet/wallet.selectors';
import { formatBalances } from '../../../../utils/units.utils';
import { SelectedAccount } from '../../../send/components/selected-account/selected-account';
import { getImageSource } from '../../../wallet/components/assets-widget/utils/get-image-source.util';
import { useTransactionSpeed } from '../../hooks/use-transaction-speed.hook';
import { Field } from '../confirmation/components/field/field';
import { TransactionSpeed } from '../confirmation/components/transaction-speed/transaction-speed';
import { ownGasFeeRules } from '../confirmation/constants';
import { ConfirmOperationParams, InternalSwapDetails } from '../evm-confirmation/types';

import { styles } from './swap-summary.styles';

interface Props extends ConfirmOperationParams {
  fromToken: Token;
  fromTokenAmount: string;
  internalSwapDetails: InternalSwapDetails;
}

export const SwapSummary: FC<Props> = ({
  fromToken,
  fromTokenAmount,
  internalSwapDetails: { toToken, toTokenAmount, exchangeRate },
  confirmOperationParams: { initialTransactionFee, onSend, isFeeLoading, isTransactionLoading }
}) => {
  const { goBack } = useNavigation();
  const slippageTolerance = useSlippageToleranceSelector();
  const account = useSelectedAccountSelector();
  const gasToken = useGasTokenSelector();

  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    clearErrors
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ownGasFee: ''
    }
  });
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
  const isConfirmButtonDisabled = !isEmpty(errors) || isTransactionLoading || isFeeLoading;

  const onConfirmPress = () => onSend(gasPriceCoefficient);

  return (
    <ModalActionsContainer
      screenTitle="Summary Swap"
      submitTitle="Confirm"
      cancelTitle="Decline"
      isSubmitDisabled={isConfirmButtonDisabled}
      onSubmitPress={handleSubmit(onConfirmPress)}
      onCancelPress={goBack}
      scrollViewRef={scrollViewRef}
      isBackButton={false}
    >
      <Row style={styles.root}>
        <Column style={styles.tokenInfo}>
          <Image source={getImageSource(fromToken.thumbnailUri)} style={styles.image} />
          <Text style={styles.symbol}>{fromToken.symbol}</Text>
          <Text style={styles.amount}>{formatBalances(fromTokenAmount)}</Text>
        </Column>
        <Icon name={IconNameEnum.ArrowRight} iconStyle={styles.icon} />
        <Column style={styles.tokenInfo}>
          <Image source={getImageSource(toToken.thumbnailUri)} style={styles.image} />
          <Text style={styles.symbol}>{toToken.symbol}</Text>
          <Text style={styles.amount}>{formatBalances(toTokenAmount)}</Text>
        </Column>
      </Row>

      <Divider style={styles.divider} />

      <SelectedAccount account={account} isDisabled style={styles.account} />

      <Column style={styles.swapInfo}>
        <Row style={styles.swapInfoRow}>
          <Text style={styles.textSemiBold}>Quote</Text>
          <Text style={styles.textRegular}>{exchangeRate}</Text>
        </Row>
        <Divider style={[styles.divider, styles.partialDivider]} />
        <Row style={styles.swapInfoRow}>
          <Text style={styles.textSemiBold}>Max Slippage</Text>
          <Text style={styles.textRegular}>{slippageTolerance} %</Text>
        </Row>
      </Column>

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
