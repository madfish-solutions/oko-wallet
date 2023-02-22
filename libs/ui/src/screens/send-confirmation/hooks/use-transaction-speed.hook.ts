import { OnEventFn } from '@rnw-community/shared';
import { useEffect, useState } from 'react';

import { MainnetRpcEnum, TestnetRpcEnum } from '../../../constants/rpc';
import { useScrollToOffset } from '../../../hooks/use-scroll-to-element.hook';
import { useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { formatUnits } from '../../../utils/units.utils';
import { SpeedOption, speedOptions } from '../components/confirmation/constants';
import { SpeedEnum } from '../components/confirmation/enums';

export const useTransactionSpeed = (ownGasFee: string, initialTransactionFee: number, clearErrors: OnEventFn<void>) => {
  const { rpcUrl, gasTokenMetadata } = useSelectedNetworkSelector();
  const { scrollViewRef, scrollToOffset } = useScrollToOffset();
  const isKlaytnNetwork = rpcUrl === MainnetRpcEnum.Klaytn || rpcUrl === TestnetRpcEnum.KlaytnBaobab;

  const [speed, setSpeed] = useState(speedOptions[isKlaytnNetwork ? 0 : 1]);
  const [isGasPickerSelected, setIsGasPickerSelected] = useState(false);

  const isOwnSpeedSelected = speed.title === SpeedEnum.Own;
  const initialTransactionFeeWithDecimals = formatUnits(initialTransactionFee, gasTokenMetadata.decimals).toNumber();

  const correctedTransactionFee = isOwnSpeedSelected
    ? Number(ownGasFee)
    : formatUnits(initialTransactionFee * Number(speed.value), gasTokenMetadata.decimals).toNumber();

  const gasPriceCoefficient = isOwnSpeedSelected
    ? Number(ownGasFee) / initialTransactionFeeWithDecimals
    : Number(speed.value);

  useEffect(
    () => void ((isOwnSpeedSelected || isGasPickerSelected) && scrollToOffset()),
    [isOwnSpeedSelected, isGasPickerSelected]
  );

  const handleSpeedChange = (speedOption: SpeedOption) => {
    setSpeed(speedOption);
    clearErrors();
  };

  const onGasFeePress = () => setIsGasPickerSelected(!isGasPickerSelected);

  return {
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
  };
};
