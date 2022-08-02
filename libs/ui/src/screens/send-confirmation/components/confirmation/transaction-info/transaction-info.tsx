import { isString } from '@rnw-community/shared';
import React, { FC, useEffect } from 'react';
import { Linking, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { MainText } from '../../../../../components/text/text';
import { NetworkTypeEnum } from '../../../../../enums/network-type.enum';
import { NetworkInterface } from '../../../../../interfaces/network.interface';
import { addTransactionAction } from '../../../../../store/wallet/wallet.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkTypeSelector
} from '../../../../../store/wallet/wallet.selectors';

interface Props {
  transactionHash: string;
  network: NetworkInterface;
  receiver: string;
}

export const TransactionInfo: FC<Props> = ({ transactionHash, receiver, network: { explorerUrl } }) => {
  const dispatch = useDispatch();
  const publicKey = useSelectedAccountPublicKeyHashSelector();
  const networkType = useSelectedNetworkTypeSelector();
  const tx = networkType === NetworkTypeEnum.Tezos ? '' : 'tx/';

  const onBlockchainExplorerPress = () => {
    if (isString(explorerUrl)) {
      return Linking.openURL(`${explorerUrl}${tx}${transactionHash}`);
    }
  };

  useEffect(() => {
    dispatch(addTransactionAction({ from: publicKey, to: receiver, transactionHash }));
  }, [transactionHash, publicKey, receiver]);

  return (
    <View>
      <MainText>The transaction was done, hash:</MainText>
      <MainText>{transactionHash}</MainText>
      {isString(explorerUrl) && (
        <MainText onPress={onBlockchainExplorerPress}>Click to watch transaction status</MainText>
      )}
    </View>
  );
};
