import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '../../../../components/button/button';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { WidgetContainer } from '../../../../components/widget-container/widget-container';
import { addTransactionAction, changeTransactionStatusAction } from '../../../../store/wallet/wallet.actions';
import {
  useIsMintedTransactionsSelector,
  useIsPendingTransactionsSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { getDefaultEvmProvider } from '../../../../utils/get-default-evm-provider.utils';

import { styles } from './activity.styles';

// interface Transaction {
//   blockHash: string;
//   blockNumber: number;
//   confirmations: number;
//   from: string;
//   status: number;
//   to: string;
//   transactionHash: string;
//   transactionIndex: number;
//   type: number;
// }

export const MOCK_TRANSACTIONS = [
  '0x6306109c98c151dfb8a5af7fa9f581d18c366a0b389ac83c41e8c0dde13d6248',
  '0x5d4cae1ffe480f36f8382727514908048fec225593eb0f05805cc29232feb2ca'
];

// export const getInitialMockTransactions = (state: WalletState, account: AccountInterface) => {
//   const accountTokensSlug = getAccountTokensSlug(
//     state.selectedNetworkRpcUrl,
//     getPublicKeyHash(account, getSelectedNetworkType(state))
//   );

//   return { [accountTokensSlug]: MOCK_TRANSACTIONS };
// };

export const Activity: FC = () => {
  const dispatch = useDispatch();
  const network = useSelectedNetworkSelector();
  const provider = getDefaultEvmProvider(network.rpcUrl);
  const pendingTransactions = useIsPendingTransactionsSelector();
  const mintedTransactions = useIsMintedTransactionsSelector();
  const [pendingTransactionHash, setPendingTransactionHash] = useState('');
  console.log(pendingTransactions, 'PENDING');
  console.log(mintedTransactions, 'minted');

  const addTxHash = () => {
    dispatch(addTransactionAction(pendingTransactionHash));
  };

  useEffect(() => {
    const checkTransctionMinted = async () => {
      pendingTransactions.map(async pendingTransaction => {
        try {
          const transaction = await provider.getTransactionReceipt(pendingTransaction.transactionHash);
          if (transaction) {
            dispatch(
              changeTransactionStatusAction({
                to: transaction.to,
                from: transaction.from,
                isMinted: false,
                transactionHash: transaction.transactionHash
              })
            );
          }
        } catch (e) {
          console.log(e);
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
      <TextInput style={styles.input} value={pendingTransactionHash} onChangeText={setPendingTransactionHash} />
      <Button title="add tx hash" onPress={addTxHash} />
      {pendingTransactions.map(tx => (
        <View key={tx.transactionHash} style={styles.root}>
          <Text style={styles.pending}>
            {tx.from}goes to{tx.to}
          </Text>
        </View>
      ))}
      {mintedTransactions.map(tx => (
        <View key={tx.transactionHash} style={styles.root}>
          <Text style={styles.minted}>
            {tx.from}goes to{tx.to}
          </Text>
        </View>
      ))}
    </View>
  );
};
