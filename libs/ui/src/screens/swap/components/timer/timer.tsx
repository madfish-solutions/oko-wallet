import { OnEventFn } from '@rnw-community/shared';
import React, { FC, useState, useEffect } from 'react';
import { View } from 'react-native';

import { QuoteResponse } from '../../../../api/1inch';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { styles } from '../../swap.styles';

interface Props {
  getRoutes: OnEventFn<void>;
  protocols?: QuoteResponse['protocols'];
}

const initialSecondsState = '30';

export const Timer: FC<Props> = ({ getRoutes, protocols }) => {
  const [seconds, setSeconds] = useState(initialSecondsState);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(currentSeconds => {
        if (Number(currentSeconds) === 0) {
          getRoutes();
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
  }, [getRoutes, protocols]);

  return (
    <Row style={styles.rateUpdatesBlock}>
      <Text style={styles.rateUpdatesText}>Rates update in</Text>
      <View style={styles.rateUpdateTimeBlock}>
        <Text style={styles.rateUpdateTimeText}>00:{seconds}</Text>
      </View>
    </Row>
  );
};
