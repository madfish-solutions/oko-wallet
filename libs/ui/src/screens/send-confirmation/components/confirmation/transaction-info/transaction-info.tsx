import { isString } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Linking, Text, View } from 'react-native';

import { NetworkInterface } from '../../../../../interfaces/network.interface';

interface Props {
  transactionHash: string;
  network: NetworkInterface;
}

export const TransactionInfo: FC<Props> = ({ transactionHash, network: { explorerUrl } }) => {
  const onBlockchainExplorerPress = () => {
    if (isString(explorerUrl)) {
      return Linking.openURL(`${explorerUrl}${transactionHash}`);
    }
  };

  return (
    <View>
      <Text>The transaction was done, hash:</Text>
      <Text selectable={true}>{transactionHash}</Text>
      {isString(explorerUrl) && <Text onPress={onBlockchainExplorerPress}>Click to watch transaction status</Text>}
    </View>
  );
};
