import React, { FC, useEffect } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';

import { Column } from '../../../components/column/column';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { useTokenInfo } from '../../../hooks/use-activity.hook';
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
  chainName: string;
}

export const ActivityList: FC<Props> = ({
  transaction: { hash, timestamp, transactionLabel, transactionStatus, symbol, amount, tokenId },
  chainName
}) => {
  const { explorerUrl } = useSelectedNetworkSelector();
  const { symbol: tokenSymbol, fetchTokenSymbol } = useTokenInfo(tokenId, chainName);
  const onBlockchainExplorerPress = () => Linking.openURL(`${explorerUrl}tx/${hash}`);

  useEffect(() => {
    fetchTokenSymbol();
  }, []);

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
                <Text style={styles.statusText}>{transactionStatus.toUpperCase()}</Text>
              </View>
              <Text style={styles.smallGreyText}>{transformTimestampToTime(timestamp)}</Text>
            </Row>
          </Column>
          <Column>
            <Row style={styles.hash}>
              <Text style={styles.smallGreyText}>Hash</Text>
              <TouchableOpacity onPress={onBlockchainExplorerPress} style={styles.touchable}>
                {/* @TODO : update to copy text component */}
                <Text style={styles.txHash}>{shortize(hash)}</Text>
                <Icon name={IconNameEnum.Tooltip} />
              </TouchableOpacity>
            </Row>
            <Row style={styles.amountContainer}>
              <Text style={styles.amount}>
                {Number(formatBalances(amount))} {symbol ? symbol.toUpperCase() : tokenSymbol.toUpperCase()}
              </Text>
            </Row>
          </Column>
        </Row>
      </Column>
    </View>
  );
};
