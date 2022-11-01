import React, { FC, useEffect } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';

import { Amount } from '../../../components/amount/amount';
import { Column } from '../../../components/column/column';
import { CopyText } from '../../../components/copy-text/copy-text';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { useTokenInfo } from '../../../hooks/use-activity.hook';
import { ActivityData, TransactionLabelEnum } from '../../../interfaces/activity.interface';
import { useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { colors } from '../../../styles/colors';
import { formatBalances } from '../../../utils/units.utils';

import { styles } from './activity-list.styles';
import { transformTimestampToTime } from './activity-list.utils';

interface Props {
  transaction: ActivityData;
  address: string;
  chainName: string;
}

export const ActivityList: FC<Props> = ({
  transaction: { hash, timestamp, transactionLabel, transactionStatus, symbol, amount = 0, tokenId },
  chainName
}) => {
  const { explorerUrl } = useSelectedNetworkSelector();
  const { symbol: tokenSymbol, fetchTokenSymbol } = useTokenInfo(tokenId, chainName);
  const onBlockchainExplorerPress = () => Linking.openURL(`${explorerUrl}/tx/${hash}`);

  useEffect(() => {
    fetchTokenSymbol();
  }, []);

  return (
    <View>
      <Column style={styles.root}>
        <Row style={styles.wrapper}>
          <Column style={styles.content}>
            <Row style={styles.sendWrapper}>
              {transactionLabel === TransactionLabelEnum.Send ? (
                <Icon name={IconNameEnum.Send} />
              ) : (
                <Icon name={IconNameEnum.Receive} color={colors.green} />
              )}
              <Text style={styles.send}>{transactionLabel}</Text>
            </Row>
            <Row style={styles.label}>
              <View style={[styles.statusWrapper, styles[transactionStatus]]}>
                <Text style={styles.statusText}>{transactionStatus.toUpperCase()}</Text>
              </View>
              <Text style={styles.smallGreyText}>{transformTimestampToTime(timestamp)}</Text>
            </Row>
          </Column>
          <Column style={styles.content}>
            <Row style={styles.rightContainer}>
              <Text style={styles.smallGreyText}>Hash</Text>
              <CopyText text={hash} style={styles.txHash} />
              <TouchableOpacity onPress={onBlockchainExplorerPress} style={styles.touchable}>
                <Icon name={IconNameEnum.Tooltip} />
              </TouchableOpacity>
            </Row>
            <Row style={styles.amountContainer}>
              <Amount
                value={formatBalances(amount)}
                symbol={symbol ? symbol.toUpperCase() : tokenSymbol.toUpperCase()}
                style={styles.amount}
              />
            </Row>
          </Column>
        </Row>
      </Column>
    </View>
  );
};
