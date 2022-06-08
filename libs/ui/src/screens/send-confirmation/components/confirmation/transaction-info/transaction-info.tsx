import { isString } from '@rnw-community/shared';
import React, { FC, useCallback } from 'react';
import { Linking, Text, View } from 'react-native';

import { NetworkInterface } from '../../../../../interfaces/network.interface';

interface Props {
  transactionHash: string;
  network: NetworkInterface;
}

export const TransactionInfo: FC<Props> = ({ transactionHash, network: { explorerUrl } }) => {
  const onPress = useCallback(() => {
    if (isString(explorerUrl)) {
      return Linking.openURL(explorerUrl);
    }
  }, []);

  return (
    <View>
      <Text>The transaction was done, hash:</Text>
      <Text selectable={true}>{transactionHash}</Text>
      {isString(explorerUrl) && <Text onPress={onPress}>Block explorer {explorerUrl}</Text>}
    </View>
  );
};
