import React, { FC } from 'react';
import { View } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './steps.styles';
import { StepsThemeEnum, themesClasses } from './themes';

interface StepsProps {
  currentStep: number;
  stepsAmount: number;
  theme?: StepsThemeEnum;
}

export const Steps: FC<StepsProps> = ({ currentStep, stepsAmount, theme = StepsThemeEnum.Primary }) => (
  <Row>
    <Text style={styles.indicatorsText}>{`Step ${currentStep}/${stepsAmount}`}</Text>
    <Row style={styles.indicators}>
      {[...new Array(currentStep).keys()].map(index => {
        const indicatorsWidth = getCustomSize(4.75);
        const step = index + 1;
        const lastStepHasNoMarginRight = getCustomSize(0.125);

        return (
          <View
            key={index}
            style={[
              styles.indicator,
              themesClasses[theme],
              step !== stepsAmount && styles.indicatorOffset,
              { width: (indicatorsWidth - stepsAmount + lastStepHasNoMarginRight) / stepsAmount }
            ]}
          />
        );
      })}
    </Row>
  </Row>
);
