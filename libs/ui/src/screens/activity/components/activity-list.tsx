import React, { FC } from 'react';
import { View } from 'react-native';

import { Column } from '../../../components/column/column';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { ScreenScrollView } from '../../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { Text } from '../../../components/text/text';
import { TransactionStatusEnum } from '../../../enums/transactions.enum';

import { styles } from './activity-list.styles';

interface Props {
  txStatus: TransactionStatusEnum;
}
export const ActivityList: FC<Props> = ({ txStatus }) => (
  <ScreenScrollView>
    <Column style={styles.root}>
      <Row>
        <Text style={styles.dateText}>May 25 2022</Text>
      </Row>
      <Row style={styles.wrapper}>
        <Column style={styles.leftContent}>
          <Row style={styles.sendWrapper}>
            <Icon name={IconNameEnum.Send} />
            <Text style={styles.send}>Send</Text>
          </Row>
          <Row>
            <View style={[styles.statusWrapper, styles[txStatus]]}>
              <Text style={styles.statusText}>{txStatus.toUpperCase()}</Text>
            </View>
            <Text style={styles.time}>20:00:59</Text>
          </Row>
        </Column>
        <Column>
          <Row>
            <Text>hash</Text>
          </Row>
          <Row>
            <Text>401 203 SYMBL</Text>
          </Row>
        </Column>
      </Row>
    </Column>
  </ScreenScrollView>
);
