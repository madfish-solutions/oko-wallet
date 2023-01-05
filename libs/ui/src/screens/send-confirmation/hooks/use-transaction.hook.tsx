import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isNotEmptyString, isString } from '@rnw-community/shared';
import { BatchOperation } from '@taquito/taquito';
import React, { useState } from 'react';
import { Linking } from 'react-native';
import { useDispatch } from 'react-redux';

import { Text } from '../../../components/text/text';
import { NetworkTypeEnum } from '../../../enums/network-type.enum';
import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useToast } from '../../../hooks/use-toast.hook';
import { Asset } from '../../../interfaces/asset.interface';
import { addTransactionAction } from '../../../store/wallet/wallet.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector,
  useSelectedNetworkTypeSelector
} from '../../../store/wallet/wallet.selectors';

export const useTransactionHook = (receiverPublicKeyHash: string, asset: Asset) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { showSuccessToast, showErrorToast } = useToast();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { explorerUrl } = useSelectedNetworkSelector();
  const networkType = useSelectedNetworkTypeSelector();

  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  const successCallback = (transactionResponse: TransactionResponse | BatchOperation) => {
    const onBlockchainExplorerPress = () => {
      if (isString(explorerUrl)) {
        const tx = networkType === NetworkTypeEnum.Tezos ? '/' : '/tx/';

        return Linking.openURL(`${explorerUrl}${tx}${transactionResponse.hash}`);
      }
    };

    showSuccessToast(
      <Text onPress={onBlockchainExplorerPress}>
        Your transaction was successfully send. Click for detail. Hash: {transactionResponse.hash.slice(0, 8)}...
      </Text>
    );

    const { tokenAddress, tokenId, standard } = asset;

    if (isNotEmptyString(tokenAddress) && isNotEmptyString(tokenId)) {
      dispatch(
        addTransactionAction({
          from: publicKeyHash,
          to: receiverPublicKeyHash,
          transactionHash: transactionResponse.hash,
          asset: { tokenAddress, tokenId, standard }
        })
      );
    }

    setIsTransactionLoading(false);
    navigate(ScreensEnum.Wallet);
  };

  const errorCallback = () => {
    showErrorToast('Transaction failed. Try other params.');

    setIsTransactionLoading(false);
  };

  return {
    isTransactionLoading,
    setIsTransactionLoading,
    successCallback,
    errorCallback
  };
};
