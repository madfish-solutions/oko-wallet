import { OnEventFn } from '@rnw-community/shared';
import isEmpty from 'lodash/isEmpty';
import React, { FC, PropsWithChildren, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { NetworkTypeEnum } from 'shared';

import { CopyText } from '../../../../components/copy-text/copy-text';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { TextInput } from '../../../../components/text-input/text-input';
import { ModalActionsContainer } from '../../../../modals/components/modal-actions-container/modal-actions-container';
import {
  useGasTokenSelector,
  useSelectedAccountSelector,
  useSelectedNetworkTypeSelector
} from '../../../../store/wallet/wallet.selectors';
import { formatUnitsToString, parseUnits } from '../../../../utils/units.utils';
import { useTransactionSpeed } from '../../hooks/use-transaction-speed.hook';
import { ConfirmOperationParams } from '../evm-confirmation/types';

import { Field } from './components/field/field';
import { FromAccount } from './components/from-account/from-account';
import { SelectedNetwork } from './components/selected-network/selected-network';
import { TransactionSpeed } from './components/transaction-speed/transaction-speed';
import { styles } from './confirmation.styles';
import { ownGasFeeRules, requiredFieldRule } from './constants';

type Props = PropsWithChildren<{
  receiverPublicKeyHash: string;
  amount: string;
  symbol: string;
}> &
  ConfirmOperationParams;

const defaultValues = {
  ownGasFee: '',
  ownStorageFee: ''
};

export const Confirmation: FC<Props> = ({
  receiverPublicKeyHash,
  symbol,
  amount,
  children,
  confirmOperationParams: {
    initialTransactionFee,
    onSend,
    isFeeLoading,
    isTransactionLoading,
    onDecline,
    storageFee = 0
  }
}) => {
  const account = useSelectedAccountSelector();
  const gasToken = useGasTokenSelector();
  const networkType = useSelectedNetworkTypeSelector();

  const {
    control,
    watch,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setValue
  } = useForm({
    mode: 'onChange',
    defaultValues
  });

  const isConfirmButtonDisabled = !isEmpty(errors) || isTransactionLoading || isFeeLoading;

  const ownGasFee = watch('ownGasFee');
  const ownsStorageFee = watch('ownStorageFee');

  const {
    isOwnSpeedSelected,
    correctedTransactionFee,
    gasPriceCoefficient,
    isKlaytnNetwork,
    initialTransactionFeeWithDecimals,
    handleSpeedChange,
    speed,
    scrollViewRef
  } = useTransactionSpeed(ownGasFee, initialTransactionFee, clearErrors as OnEventFn<void>);

  const correctedStorageFee = isOwnSpeedSelected ? Number(ownsStorageFee) : storageFee;

  const isTezosNetwork = networkType === NetworkTypeEnum.Tezos;
  const isEvmNetwork = networkType === NetworkTypeEnum.EVM;

  useEffect(() => {
    setValue('ownGasFee', formatUnitsToString(initialTransactionFee, gasToken.decimals));

    if (isTezosNetwork) {
      setValue('ownStorageFee', storageFee.toString());
    }
  }, [initialTransactionFee, storageFee, isTezosNetwork, gasToken.decimals]);

  const onConfirmPress = () => {
    if (isTezosNetwork) {
      const gasFeeToSend = parseUnits(correctedTransactionFee, gasToken.decimals).toNumber();

      onSend({ storageFee: correctedStorageFee, gasFee: gasFeeToSend });
    } else {
      onSend(gasPriceCoefficient);
    }
  };

  return (
    <ModalActionsContainer
      screenTitle="Confirm Operation"
      submitTitle="Confirm"
      cancelTitle="Decline"
      onCancelPress={onDecline}
      onSubmitPress={handleSubmit(onConfirmPress)}
      isSubmitDisabled={isConfirmButtonDisabled}
      isCancelDisabled={isTransactionLoading}
      isBackButton={false}
      scrollViewRef={scrollViewRef}
    >
      <View>
        {children}
        <FromAccount account={account} />
        <SelectedNetwork />
        <View style={styles.container}>
          <Text style={styles.title}>Operation</Text>
          <View style={styles.operationContainer}>
            <Row style={styles.sendBlock}>
              <Text style={styles.operationText}>Send</Text>
              <Row>
                {amount !== '0' && (
                  <>
                    <Text style={styles.amount}>{amount}</Text>
                    <Text style={[styles.symbol, styles.symbolColor]}>{symbol}</Text>
                  </>
                )}
              </Row>
            </Row>
            <Row style={styles.receiverBlock}>
              <Text style={styles.operationText}>To</Text>
              <CopyText text={receiverPublicKeyHash} />
            </Row>
          </View>
        </View>

        <View>
          <Text style={styles.title}>Transactions Details</Text>
          {isEvmNetwork && (
            <Field
              title="Max Gas fee"
              loading={isFeeLoading}
              amount={correctedTransactionFee}
              symbol={gasToken.symbol}
            />
          )}
          {!isKlaytnNetwork && (
            <TransactionSpeed
              speed={speed}
              handleSpeedChange={handleSpeedChange}
              initialTransactionFeeWithDecimals={initialTransactionFeeWithDecimals}
              ownGasFee={ownGasFee}
            />
          )}
          {isTezosNetwork && (
            <Field title="Gas fee" loading={isFeeLoading} amount={correctedTransactionFee} symbol={gasToken.symbol} />
          )}

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
                  {...(isEvmNetwork && { containerStyle: styles.footerMargin })}
                />
              )}
            />
          )}
          {isTezosNetwork && (
            <View style={[isOwnSpeedSelected && styles.storageFeeInputContainer]}>
              <Field title="Storage fee" loading={isFeeLoading} amount={correctedStorageFee} symbol={symbol} />

              {isOwnSpeedSelected && (
                <Controller
                  control={control}
                  name="ownStorageFee"
                  rules={requiredFieldRule}
                  render={({ field }) => (
                    <TextInput
                      field={field}
                      placeholder={`${storageFee}`}
                      keyboardType="numeric"
                      decimals={gasToken.decimals}
                      error={errors?.ownStorageFee?.message}
                      containerStyle={styles.footerMargin}
                    />
                  )}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </ModalActionsContainer>
  );
};
