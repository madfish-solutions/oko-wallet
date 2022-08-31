import React, { FC } from 'react';
import { View } from 'react-native';

import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './steps.styles';

interface StepsProps {
  currentStep: number;
  stepsAmount: number;
}

export const Steps: FC<StepsProps> = ({ currentStep, stepsAmount }) => (
  <Row>
    <Text style={styles.indicatorsText}>{`Step ${currentStep}/${stepsAmount}`}</Text>
    <Row style={styles.indicators}>
      {[...new Array(currentStep).keys()].map(index => {
        const indicatorsWidth = 38;
        const step = index + 1;
        const lastStepHasNoMarginRight = 1;

        return (
          <View
            key={index}
            style={[
              styles.indicator,
              step !== stepsAmount && styles.indicatorOffset,
              { width: (indicatorsWidth - stepsAmount + lastStepHasNoMarginRight) / stepsAmount }
            ]}
          />
        );
      })}
    </Row>
  </Row>
);
