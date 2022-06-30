import React, { FC, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '../../../../components/button/button';
import { addTransactionAction, updateTransactionAction } from '../../../../store/wallet/wallet.actions';
import {
  useIsMintedTransactionsSelector,
  useIsPendingTransactionsSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { getDefaultEvmProvider } from '../../../../utils/get-default-evm-provider.utils';

import { styles } from './activity.styles';

export const Activity: FC = () => {
  const dispatch = useDispatch();
  const network = useSelectedNetworkSelector();
  const publicKey = useSelectedAccountPublicKeyHashSelector();
  const provider = getDefaultEvmProvider(network.rpcUrl);
  const pendingTransactions = useIsPendingTransactionsSelector();
  const mintedTransactions = useIsMintedTransactionsSelector();
  const [pendingTransactionHash, setPendingTransactionHash] = useState('');
  const EXPLORER_URL = 'https://www.klaytnfinder.io/tx/';

  const addTxHash = () => {
    dispatch(addTransactionAction({ transactionHash: pendingTransactionHash, from: publicKey, to: '' }));
  };

  useEffect(() => {
    const checkTransctionMinted = async () => {
      pendingTransactions.map(async pendingTransaction => {
        try {
          const transaction = await provider.getTransactionReceipt(pendingTransaction.transactionHash);
          if (transaction !== null) {
            dispatch(
              updateTransactionAction({
                to: transaction.to,
                from: transaction.from,
                isMinted: false,
                transactionHash: transaction.transactionHash
              })
            );
          }
        } catch (e) {
          console.log('failed to get transaction receipt');
        }
      });
    };
    const timer = setInterval(() => checkTransctionMinted(), 30000);

    return () => {
      clearInterval(timer);
    };
  }, [pendingTransactions]);

  return (
    <View style={styles.wrapper}>
      {/* THIS IS JUST FOR TESTING - YOU CAN PASTE PENDING TX HASH AND IT'S BECOME MINTED AFTER MINT */}
      <TextInput style={styles.input} value={pendingTransactionHash} onChangeText={setPendingTransactionHash} />
      <Button title="add tx hash" onPress={addTxHash} />
      {pendingTransactions.map(tx => (
        <View key={tx.transactionHash} style={styles.tx}>
          <Text style={styles.pending}>Pending:{tx.transactionHash}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`${EXPLORER_URL}${tx.transactionHash}`)}>
            <Text>view details</Text>
          </TouchableOpacity>
        </View>
      ))}
      {mintedTransactions.map(tx => (
        <View key={tx.transactionHash} style={styles.tx}>
          <Text style={styles.minted}>
            Send:{tx.from}to{tx.to}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(`${EXPLORER_URL}${tx.transactionHash}`)}>
            <Text>view details</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};
