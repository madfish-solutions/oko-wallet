import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { View } from 'react-native';

import { FragmentSelector } from '../../../../../../components/fragment-selector/fragment-selector';
import { Row } from '../../../../../../components/row/row';
import { Text } from '../../../../../../components/text/text';
import { SpeedOption, speedOptions } from '../../constants';
import { SpeedEnum } from '../../enums';
import { getProgressStatus } from '../../utils/get-progress-status.util';
import { ProgressBar } from '../progress-bar/progress-bar';

import { styles } from './transaction-speed.styles';

interface Props {
  handleSpeedChange: OnEventFn<SpeedOption>;
  speed: SpeedOption;
  initialTransactionFeeWithDecimals: number;
  ownGasFee: string;
}

export const TransactionSpeed: FC<Props> = ({
  speed,
  handleSpeedChange,
  initialTransactionFeeWithDecimals,
  ownGasFee
}) => {
  const isOwnSpeedSelected = speed.title === SpeedEnum.Own;
  const progressStatus = isOwnSpeedSelected
    ? getProgressStatus(initialTransactionFeeWithDecimals, ownGasFee)
    : speed.title;

  return (
    <>
      <Row style={styles.speedBlock}>
        <Text style={styles.speedOfTransactionText}>Speed of transaction</Text>
        <ProgressBar status={progressStatus} />
      </Row>
      <View style={styles.selectorBlock}>
        <FragmentSelector options={speedOptions} onSelect={handleSpeedChange} selectedItem={speed} />
      </View>
    </>
  );
};
