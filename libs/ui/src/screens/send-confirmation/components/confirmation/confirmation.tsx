import isEmpty from 'lodash/isEmpty';
import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Button } from '../../../../components/button/button';
import { CopyText } from '../../../../components/copy-text/copy-text';
import { Divider } from '../../../../components/divider/divider';
import { IconWithBorder } from '../../../../components/icon-with-border/icon-with-border';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Row } from '../../../../components/row/row';
import { TextInput } from '../../../../components/text-input/text-input';
import { Text } from '../../../../components/text/text';
import { NetworkTypeEnum } from '../../../../enums/network-type.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { ModalActionContainer } from '../../../../modals/components/modal-action-container/modal-action-container';
import {
  useSelectedAccountSelector,
  useSelectedNetworkSelector,
  useSelectedNetworkTypeSelector
} from '../../../../store/wallet/wallet.selectors';
import { formatUnits, parseUnits } from '../../../../utils/units.utils';
import { SelectedAccount } from '../../../send/components/selected-account/selected-account';
import { OnSend } from '../../types';

import { FeeItem } from './components/fee-item/fee-item';
import { ProgressBar } from './components/progress-bar/progress-bar';
import { styles } from './confirmation.styles';
import { ownGasFeeRules, requiredFieldRule, SpeedOption, speedOptions } from './constants';
import { SpeedEnum } from './enums';
import { getProgressStatus } from './utils/get-progress-status.util';

interface Props {
  isFeeLoading: boolean;
  onSend: OnSend;
  isTransactionLoading: boolean;
  receiverPublicKeyHash: string;
  amount: string;
  symbol: string;
  initialTransactionFee: number;
  storageFee?: number;
}

const defaultValues = {
  ownGasFee: '',
  ownStorageFee: ''
};

export const Confirmation: FC<Props> = ({
  isFeeLoading,
  onSend,
  isTransactionLoading,
  receiverPublicKeyHash,
  symbol,
  amount,
  initialTransactionFee,
  storageFee = 0,
  children
}) => {
  const { goBack } = useNavigation();
  const account = useSelectedAccountSelector();
  const {
    iconName,
    name,
    gasTokenMetadata: { symbol: gasTokenSymbol, decimals: gasTokenDecimals }
  } = useSelectedNetworkSelector();
  const networkType = useSelectedNetworkTypeSelector();
  const [speed, setSpeed] = useState(speedOptions[1]);
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
  const scrollViewRef = useRef<ScrollView>(null);

  const isConfirmButtonDisabled = !isEmpty(errors) || isTransactionLoading;
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
      setTimeout(() => {
        scrollViewRef?.current?.scrollTo({ y: 500 });
      }, 0);
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
      onCancelPress={goBack}
      onSubmitPress={handleSubmit(onConfirmPress)}
      isSubmitDisabled={isConfirmButtonDisabled}
      isCancelDisabled={isTransactionLoading}
      isBackButton={false}
      scrollViewRef={scrollViewRef}
    >
      <View>
        {children}
        <View style={styles.container}>
          <Text style={styles.title}>From</Text>
          <SelectedAccount account={account} isDisabled />
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Network</Text>
          <Row style={styles.networkContainer}>
            <IconWithBorder>
              <Icon name={iconName ?? IconNameEnum.NetworkFallback} />
            </IconWithBorder>
            <Text style={styles.networkName}>{name}</Text>
          </Row>
        </View>

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
            <FeeItem title="Gas" loading={isFeeLoading} fee={correctedTransactionFee} symbol={gasTokenSymbol} />
          )}
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
          {isTezosNetwork && (
            <FeeItem title="Gas" loading={isFeeLoading} fee={correctedTransactionFee} symbol={symbol} />
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
