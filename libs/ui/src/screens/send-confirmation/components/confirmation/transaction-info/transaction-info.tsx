import { isString } from '@rnw-community/shared';
import React, { FC, useEffect } from 'react';
import { Linking, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { NetworkInterface } from '../../../../../interfaces/network.interface';
import { addTransactionAction } from '../../../../../store/wallet/wallet.actions';
import { useSelectedAccountPublicKeyHashSelector } from '../../../../../store/wallet/wallet.selectors';

interface Props {
  transactionHash: string;
  network: NetworkInterface;
  receiver: string;
}

export const TransactionInfo: FC<Props> = ({ transactionHash, receiver, network: { explorerUrl } }) => {
  const dispatch = useDispatch();
  const publicKey = useSelectedAccountPublicKeyHashSelector();
  const onBlockchainExplorerPress = () => {
    if (isString(explorerUrl)) {
      return Linking.openURL(explorerUrl);
    }
  };

  useEffect(() => {
    dispatch(addTransactionAction({ from: publicKey, to: receiver, transactionHash }));
  }, [transactionHash]);

  return (
    <View>
      <Text>The transaction was done, hash:</Text>
      <Text selectable={true}>{transactionHash}</Text>
      {isString(explorerUrl) && <Text onPress={onBlockchainExplorerPress}>Block explorer {explorerUrl}</Text>}
    </View>
  );
};
