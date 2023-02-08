import { OnEventFn } from '@rnw-community/shared';
import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';

import { GetQuoteResponse } from '../../../../api/1inch/types';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';

import { styles } from './timer.styles';

interface Props {
  getAmountAndRoutes: OnEventFn<void>;
  routes?: GetQuoteResponse['protocols'];
}

const initialSecondsState = 30;

export const Timer: FC<Props> = ({ getAmountAndRoutes, routes }) => {
  const [seconds, setSeconds] = useState(initialSecondsState);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(currentSeconds => {
        if (currentSeconds === 0) {
          clearInterval(interval);

          return 0;
        }

        return currentSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      setSeconds(initialSecondsState);
    };
  }, [getAmountAndRoutes, routes]);

  useEffect(() => {
    if (seconds === 0) {
      getAmountAndRoutes();
    }
  }, [seconds]);

  return (
    <Row style={styles.root}>
      <Text style={styles.rateUpdates}>Rates update in</Text>
      <View style={styles.timeBlock}>
        <Text style={styles.time}>00:{`0${seconds}`.slice(-2)}</Text>
      </View>
    </Row>
  );
};
