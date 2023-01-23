import { OnEventFn } from '@rnw-community/shared';
import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';

import { GetAmountAndRoutesResponse } from '../../../../api/1inch';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';

import { styles } from './timer.styles';

interface Props {
  getAmountAndRoutes: OnEventFn<void>;
  routes?: GetAmountAndRoutesResponse['protocols'];
}

const initialSecondsState = '30';

export const Timer: FC<Props> = ({ getAmountAndRoutes, routes }) => {
  const [seconds, setSeconds] = useState(initialSecondsState);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(currentSeconds => {
        if (Number(currentSeconds) === 0) {
          getAmountAndRoutes();
          clearInterval(interval);

          return '00';
        }

        return `0${Number(currentSeconds) - 1}`.slice(-2);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      setSeconds(initialSecondsState);
    };
  }, [getAmountAndRoutes, routes]);

  return (
    <Row style={styles.root}>
      <Text style={styles.rateUpdates}>Rates update in</Text>
      <View style={styles.timeBlock}>
        <Text style={styles.time}>00:{seconds}</Text>
      </View>
    </Row>
  );
};
