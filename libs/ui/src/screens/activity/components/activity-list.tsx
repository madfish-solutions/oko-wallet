import React, { FC } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';

import { Column } from '../../../components/column/column';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ActivityData, TransactionLabelEnum } from '../../../interfaces/activity.interface';
import { useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { colors } from '../../../styles/colors';
import { shortize } from '../../../utils/shortize.util';
import { formatBalances } from '../../../utils/units.utils';

import { styles } from './activity-list.styles';
import { checkIsDayLabelNeeded, transformTimestampToDate, transformTimestampToTime } from './activity-list.utils';

interface Props {
  transaction: ActivityData;
  address: string;
}

export const ActivityList: FC<Props> = ({
  transaction: { hash, timestamp, transactionLabel, transactionStatus, symbol, amount }
}) => {
  const { explorerUrl } = useSelectedNetworkSelector();
  const onBlockchainExplorerPress = () => Linking.openURL(`${explorerUrl}tx/${hash}`);

  console.log(symbol, 'SYMBOL!!');

  return (
    <View>
      <Column style={styles.root}>
        {checkIsDayLabelNeeded(timestamp) && (
          <Row style={styles.dateWrapper}>
            <Text style={styles.dateText}>{transformTimestampToDate(timestamp)}</Text>
          </Row>
        )}
        <Row style={styles.wrapper}>
          <Column style={styles.leftContent}>
            <Row style={styles.sendWrapper}>
              {transactionLabel === TransactionLabelEnum.Send ? (
                <Icon name={IconNameEnum.Send} />
              ) : (
                <Icon name={IconNameEnum.Receive} color={colors.green} />
              )}
              <Text style={styles.send}>{transactionLabel}</Text>
            </Row>
            <Row>
              <View style={[styles.statusWrapper, styles[transactionStatus]]}>
                <Text style={styles.statusText}>{transactionStatus}</Text>
              </View>
              <Text style={styles.smallGreyText}>{transformTimestampToTime(timestamp)}</Text>
            </Row>
          </Column>
          <Column>
            <Row style={styles.hash}>
              <Text style={styles.smallGreyText}>hash</Text>
              <TouchableOpacity onPress={onBlockchainExplorerPress} style={styles.touchable}>
                <Text style={styles.txHash}>{shortize(hash)}</Text>
                <Icon name={IconNameEnum.Tooltip} />
              </TouchableOpacity>
            </Row>
            <Row style={styles.amountContainer}>
              <Text style={styles.amount}>
                {Number(formatBalances(amount))} {symbol?.toUpperCase()}
              </Text>
            </Row>
          </Column>
        </Row>
      </Column>
    </View>
  );
};
