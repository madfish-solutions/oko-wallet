import React, { FC, useEffect } from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { useDispatch } from 'react-redux';

import { Text } from '../../../../components/text/text';
import { NetworkTypeEnum } from '../../../../enums/network-type.enum';
import { TransactionStatusEnum } from '../../../../enums/transactions.enum';
import { updateTransactionAction } from '../../../../store/wallet/wallet.actions';
import {
  useMintedTransactionsSelector,
  usePendingTransactionsSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { getDefaultEvmProvider } from '../../../../utils/get-default-evm-provider.utils';

import { styles } from './activity.styles';

let timer: NodeJS.Timer;

export const Activity: FC = () => {
  const dispatch = useDispatch();
  const { rpcUrl, explorerUrl, networkType } = useSelectedNetworkSelector();
  const provider = getDefaultEvmProvider(rpcUrl);
  const pendingTransactions = usePendingTransactionsSelector();
  const mintedTransactions = useMintedTransactionsSelector();

  const explorerUrlPrefix = networkType === NetworkTypeEnum.EVM ? 'tx/' : '';

  const viewDetailsUrl = (txHash: string) => `${explorerUrl}${explorerUrlPrefix}${txHash}`;

  useEffect(() => {
    timer = setInterval(() => {
      (() => {
        pendingTransactions.map(async pendingTransaction => {
          try {
            const transaction = await provider.getTransactionReceipt(pendingTransaction.transactionHash);
            if (transaction !== null) {
              dispatch(
                updateTransactionAction({
                  to: transaction.to,
                  from: transaction.from,
                  status: TransactionStatusEnum.applied,
                  transactionHash: transaction.transactionHash
                })
              );
            }
          } catch (e) {
            console.log('failed to get transaction receipt');
          }
        });
      })();
    }, 30000);

    return () => clearInterval(timer);
  }, [pendingTransactions]);

  return (
    <View style={styles.wrapper}>
      {pendingTransactions.map(tx => (
        <View key={tx.transactionHash} style={styles.tx}>
          <Text style={styles.pending}>
            Pending:{tx.from} TO {tx.to}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(viewDetailsUrl(tx.transactionHash))}>
            <Text>view details</Text>
          </TouchableOpacity>
        </View>
      ))}
      {mintedTransactions.map(tx => (
        <View key={tx.transactionHash} style={styles.tx}>
          <Text style={styles.minted}>
            Send:{tx.from} TO {tx.to}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(viewDetailsUrl(tx.transactionHash))}>
            <Text>view details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
