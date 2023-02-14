import { isDefined } from '@rnw-community/shared';
import React, { FC, useMemo, memo } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';

import { Column } from '../../../components/column/column';
import { CopyText } from '../../../components/copy-text/copy-text';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { TokenAmount } from '../../../components/token-amount/token-amount';
import { ActivityData } from '../../../interfaces/activity-data.interface';
import { TransactionTypeEnum } from '../../../interfaces/activity.enum';
import { useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { colors } from '../../../styles/colors';
import { formatBalances } from '../../../utils/units.utils';

import { styles } from './activity-item.styles';
import { transformTimestampToTime } from './activity-item.utils';

type Props = Omit<ActivityData, 'tokenId' | 'isCollectible'>;

export const ActivityItem: FC<Props> = memo(
  ({ type, hash, timestamp, label, status, symbol, amount, projectName, transfer }) => {
    const { explorerUrl } = useSelectedNetworkSelector();

    const onBlockchainExplorerPress = () => Linking.openURL(`${explorerUrl}/tx/${hash}`);

    const transactionIcon = useMemo(() => {
      switch (type) {
        case TransactionTypeEnum.Send:
          return <Icon name={IconNameEnum.SendSmall} />;
        case TransactionTypeEnum.Receive:
          return <Icon name={IconNameEnum.ReceiveSmall} color={colors.green} />;
        default:
          return <Icon name={IconNameEnum.Document} />;
      }
    }, [type]);

    return (
      <Column style={styles.root}>
        <Row style={styles.wrapper}>
          <Column style={styles.content}>
            <Row style={styles.sendWrapper}>
              {transactionIcon}
              <Text style={styles.send}>{label}</Text>
            </Row>
            <Row style={styles.label}>
              <View style={[styles.statusWrapper, styles[status]]}>
                <Text style={styles.statusText}>{status.toUpperCase()}</Text>
              </View>
              <Text style={styles.smallGreyText}>{transformTimestampToTime(timestamp)}</Text>
            </Row>
          </Column>
          <Column style={styles.content}>
            <Row style={styles.rightContainer}>
              <CopyText text={hash} style={styles.txHash} textStyles={styles.txHashText} />
              <TouchableOpacity onPress={onBlockchainExplorerPress} style={styles.touchable}>
                <Icon name={IconNameEnum.Tooltip} />
              </TouchableOpacity>
            </Row>
            <Column style={styles.amountContainer}>
              {isDefined(projectName) && (
                <Text style={[styles.projectName, isDefined(amount) && styles.projectNameMargin]}>{projectName}</Text>
              )}
              {isDefined(amount) && (
                <TokenAmount
                  value={formatBalances(amount)}
                  symbol={symbol}
                  style={styles.amount}
                  symbolStyle={styles.symbol}
                />
              )}
              {isDefined(transfer) && (transfer.sends.length > 0 || transfer.receives.length > 0) && (
                <Column style={[styles.transfer, isDefined(projectName) && styles.transferMargin]}>
                  {transfer.sends.length > 0 && (
                    <Row>
                      <Text style={styles.minus}>–</Text>
                      <TokenAmount
                        value={formatBalances(transfer.sends[0].amount)}
                        symbol={transfer.sends[0].symbol}
                        style={styles.amount}
                        symbolStyle={styles.symbol}
                      />
                    </Row>
                  )}
                  {transfer.receives.length > 0 && (
                    <Row style={styles.transferItem}>
                      <Text style={styles.plus}>+</Text>
                      <TokenAmount
                        value={formatBalances(transfer.receives[0].amount)}
                        symbol={transfer.receives[0].symbol}
                        style={styles.amount}
                        symbolStyle={styles.symbol}
                      />
                    </Row>
                  )}
                </Column>
              )}
            </Column>
          </Column>
        </Row>
      </Column>
    );
  }
);
