import isEmpty from 'lodash/isEmpty';
import React, { FC, Fragment, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Button } from '../../../../components/button/button';
import { CopyText } from '../../../../components/copy-text/copy-text';
import { Divider } from '../../../../components/divider/divider';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { TextInput } from '../../../../components/text-input/text-input';
import { MainnetRpcEnum, TestnetRpcEnum } from '../../../../constants/rpc';
import { NetworkTypeEnum } from '../../../../enums/network-type.enum';
import { useScrollToOffset } from '../../../../hooks/use-scroll-to-element.hook';
import { ModalActionContainer } from '../../../../modals/components/modal-action-container/modal-action-container';
import {
  useSelectedAccountSelector,
  useSelectedNetworkSelector,
  useSelectedNetworkTypeSelector
} from '../../../../store/wallet/wallet.selectors';
import { formatUnits, parseUnits } from '../../../../utils/units.utils';
import { OnSend } from '../../types';

import { FeeItem } from './components/fee-item/fee-item';
import { FromAccount } from './components/from-account/from-account';
import { ProgressBar } from './components/progress-bar/progress-bar';
import { SelectedNetwork } from './components/selected-network/selected-network';
import { styles } from './confirmation.styles';
import { ownGasFeeRules, requiredFieldRule, SpeedOption, speedOptions } from './constants';
import { SpeedEnum } from './enums';
import { getProgressStatus } from './utils/get-progress-status.util';

type Props = PropsWithChildren<{
  isFeeLoading: boolean;
  onSend: OnSend;
  onDecline: () => void;
  isTransactionLoading: boolean;
  receiverPublicKeyHash: string;
  amount: string;
  symbol: string;
  initialTransactionFee: number;
  storageFee?: number;
}>;

const defaultValues = {
  ownGasFee: '',
  ownStorageFee: ''
};

export const Confirmation: FC<Props> = ({
  isFeeLoading,
  onSend,
  onDecline,
  isTransactionLoading,
  receiverPublicKeyHash,
  symbol,
  amount,
  initialTransactionFee,
  storageFee = 0,
  children
}) => {
  const account = useSelectedAccountSelector();
  const {
    gasTokenMetadata: { symbol: gasTokenSymbol, decimals: gasTokenDecimals },
    rpcUrl
  } = useSelectedNetworkSelector();
  const networkType = useSelectedNetworkTypeSelector();
  const { scrollViewRef, scrollToOffset } = useScrollToOffset();

  const isKlaytnNetwork = rpcUrl === MainnetRpcEnum.Klaytn || rpcUrl === TestnetRpcEnum.KlaytnBaobab;
  const [speed, setSpeed] = useState(speedOptions[isKlaytnNetwork ? 0 : 1]);

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
  const isOwnSpeedSelected = speed.value === SpeedEnum.Own;

  const ownGasFee = watch('ownGasFee');
  const ownsStorageFee = watch('ownStorageFee');

  const initialTransactionFeeWithDecimals = formatUnits(initialTransactionFee, gasTokenDecimals).toNumber();

  const correctedTransactionFee = isOwnSpeedSelected
    ? Number(ownGasFee)
    : formatUnits(initialTransactionFee * Number(speed.value), gasTokenDecimals).toNumber();
  const correctedStorageFee = isOwnSpeedSelected ? Number(ownsStorageFee) : storageFee;

  const isTezosNetwork = networkType === NetworkTypeEnum.Tezos;
  const isEvmNetwork = networkType === NetworkTypeEnum.EVM;

  const progressStatus = isOwnSpeedSelected
    ? getProgressStatus(initialTransactionFeeWithDecimals, Number(ownGasFee))
    : speed.title;

  useEffect(() => {
    if (isOwnSpeedSelected) {
      scrollToOffset();
    }
  }, [isOwnSpeedSelected]);

  useEffect(() => {
    setValue('ownGasFee', formatUnits(initialTransactionFee, gasTokenDecimals).toString());

    if (isTezosNetwork) {
      setValue('ownStorageFee', storageFee.toString());
    }
  }, [initialTransactionFee, storageFee, isTezosNetwork, gasTokenDecimals]);

  const handleSpeedChange = (speedOption: SpeedOption) => {
    setSpeed(speedOption);
    clearErrors();
  };

  const onConfirmPress = () => {
    if (isTezosNetwork) {
      const gasFeeToSend = parseUnits(correctedTransactionFee, gasTokenDecimals).toNumber();

      onSend({ storageFee: correctedStorageFee, gasFee: gasFeeToSend });
    } else {
      const gasPriceCoefficient = isOwnSpeedSelected
        ? Number(ownGasFee) / initialTransactionFeeWithDecimals
        : Number(speed.value);

      onSend(gasPriceCoefficient);
    }
  };

  return (
    <ModalActionContainer
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
            <FeeItem title="Max Gas" loading={isFeeLoading} fee={correctedTransactionFee} symbol={gasTokenSymbol} />
          )}
          {!isKlaytnNetwork && (
            <>
              <Row style={styles.speedBlock}>
                <Text style={styles.speedOfTransactionText}>Speed of transaction</Text>
                <ProgressBar status={progressStatus} />
              </Row>
              <Row style={styles.speedContainer}>
                {speedOptions.map(({ title, value }, index) => (
                  <Fragment key={title}>
                    <Button
                      title={title}
                      onPress={() => handleSpeedChange({ title, value })}
                      style={[styles.speedItem, speed.value === value && styles.activeSpeedItem]}
                      styleText={styles.speedItemText}
                    />
                    {speedOptions.length - 1 !== index && <Divider style={styles.borderRight} />}
                  </Fragment>
                ))}
              </Row>
            </>
          )}
          {isTezosNetwork && (
            <FeeItem title="Gas" loading={isFeeLoading} fee={correctedTransactionFee} symbol={gasTokenSymbol} />
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
                  decimals={gasTokenDecimals}
                  {...(isEvmNetwork && { containerStyle: styles.footerMargin })}
                />
              )}
            />
          )}
          {isTezosNetwork && (
            <View style={[isOwnSpeedSelected && styles.storageFeeInputContainer]}>
              <FeeItem title="Storage" loading={isFeeLoading} fee={correctedStorageFee} symbol={symbol} />

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
                      decimals={gasTokenDecimals}
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
    </ModalActionContainer>
  );
};
