import React, { FC, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { useDispatch } from 'react-redux';

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
  const network = useSelectedNetworkSelector();

  return <>{network.networkType === NetworkTypeEnum.EVM ? <EVMnetworkActivity /> : <TezosActivity />}</>;
};

const TezosActivity: FC = () => (
  <View>
    <Text>activity for this network is not supported</Text>
  </View>
);

const EVMnetworkActivity: FC = () => {
  const dispatch = useDispatch();
  const { rpcUrl, explorerUrl } = useSelectedNetworkSelector();
  const provider = getDefaultEvmProvider(rpcUrl);
  const pendingTransactions = usePendingTransactionsSelector();
  const mintedTransactions = useMintedTransactionsSelector();

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
    }, 3000);

    return () => clearInterval(timer);
  }, [pendingTransactions]);

  return (
    <View style={styles.wrapper}>
      {pendingTransactions.map(tx => (
        <View key={tx.transactionHash} style={styles.tx}>
          <Text style={styles.pending}>
            Pending:{tx.from} TO {tx.to}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(`${explorerUrl}tx/${tx.transactionHash}`)}>
            <Text>view details</Text>
          </TouchableOpacity>
        </View>
      ))}
      {mintedTransactions.map(tx => (
        <View key={tx.transactionHash} style={styles.tx}>
          <Text style={styles.minted}>
            Send:{tx.from} TO {tx.to}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(`${explorerUrl}tx/${tx.transactionHash}`)}>
            <Text>view details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
