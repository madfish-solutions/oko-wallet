import React, { FC } from 'react';
import { View } from 'react-native';

import { Column } from '../../../components/column/column';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ActivityData } from '../../../hooks/use-activity.hook';
import { shortize } from '../../../utils/shortize.util';

import { styles } from './activity-list.styles';

interface Props {
  transaction: ActivityData;
  address: string;
}

export const ActivityList: FC<Props> = ({
  transaction: { hash, timestamp, transactionLabel, transactionStatus, symbol, amount }
}) => (
  <View>
    <Column style={styles.root}>
      <Row>
        <Text style={styles.dateText}>May 25 2022</Text>
      </Row>
      <Row style={styles.wrapper}>
        <Column style={styles.leftContent}>
          <Row style={styles.sendWrapper}>
            <Icon name={IconNameEnum.Send} />
            <Text style={styles.send}>{transactionLabel}</Text>
          </Row>
          <Row>
            <View style={[styles.statusWrapper, styles[transactionStatus]]}>
              <Text style={styles.statusText}>{transactionStatus}</Text>
            </View>
            <Text style={styles.smallGreyText}>{timestamp}</Text>
          </Row>
        </Column>
        <Column>
          <Row style={styles.hash}>
            <Text style={styles.smallGreyText}>hash</Text>
            <Text style={styles.txHash}>{shortize(hash)}</Text>
            <Icon name={IconNameEnum.Tooltip} />
          </Row>
          <Row>
            <Text style={styles.amount}>
              {amount || 0} {symbol}
            </Text>
          </Row>
        </Column>
      </Row>
    </Column>
  </View>
);
