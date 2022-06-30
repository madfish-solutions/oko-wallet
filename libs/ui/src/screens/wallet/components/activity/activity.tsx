import React, { FC, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { useDispatch } from 'react-redux';

import { updateTransactionAction } from '../../../../store/wallet/wallet.actions';
import {
  useIsMintedTransactionsSelector,
  useIsPendingTransactionsSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { getDefaultEvmProvider } from '../../../../utils/get-default-evm-provider.utils';

import { styles } from './activity.styles';

let timer: NodeJS.Timer;

export const Activity: FC = () => {
  const dispatch = useDispatch();
  const network = useSelectedNetworkSelector();
  const provider = getDefaultEvmProvider(network.rpcUrl);
  const pendingTransactions = useIsPendingTransactionsSelector();
  const mintedTransactions = useIsMintedTransactionsSelector();
  const EXPLORER_URL = 'https://www.klaytnfinder.io/tx/';

  useEffect(() => {
    timer = setInterval(async () => {
      (async () => {
        pendingTransactions.map(async pendingTransaction => {
          try {
            const transaction = await provider.getTransactionReceipt(pendingTransaction.transactionHash);
            if (transaction !== null) {
              dispatch(
                updateTransactionAction({
                  to: transaction.to,
                  from: transaction.from,
                  isMinted: true,
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
          <TouchableOpacity onPress={() => Linking.openURL(`${EXPLORER_URL}${tx.transactionHash}`)}>
            <Text>view details</Text>
          </TouchableOpacity>
        </View>
      ))}
      {mintedTransactions.map(tx => (
        <View key={tx.transactionHash} style={styles.tx}>
          <Text style={styles.minted}>
            Send:{tx.from} TO {tx.to}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(`${EXPLORER_URL}${tx.transactionHash}`)}>
            <Text>view details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
