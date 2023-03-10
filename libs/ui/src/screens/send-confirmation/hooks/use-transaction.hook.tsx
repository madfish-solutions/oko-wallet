import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isNotEmptyString, isString, OnEventFn } from '@rnw-community/shared';
import { BatchOperation } from '@taquito/taquito';
import React, { useState } from 'react';
import { Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { NetworkTypeEnum } from 'shared';

import { ToastDescription } from '../../../components/toast-description/toast-description';
import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useToast } from '../../../hooks/use-toast.hook';
import { Token } from '../../../interfaces/token.interface';
import { waitForApproveTxToBeSuccessAction } from '../../../store/swap/swap.actions';
import { addTransactionAction } from '../../../store/wallet/wallet.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector,
  useSelectedNetworkTypeSelector
} from '../../../store/wallet/wallet.selectors';
import { OperationsEnum } from '../enums';

export const useTransactionHook = (
  receiverPublicKeyHash: string,
  token: Token,
  operation: OperationsEnum,
  isDAppOperation: boolean,
  additionalSuccessCallback?: OnEventFn<TransactionResponse>
) => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const { showSuccessToast, showErrorToast } = useToast();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { explorerUrl } = useSelectedNetworkSelector();
  const networkType = useSelectedNetworkTypeSelector();

  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  const successCallback = (transactionResponse: TransactionResponse | BatchOperation) => {
    const isEvmNetwork = networkType === NetworkTypeEnum.EVM;

    const onBlockchainExplorerPress = () => {
      if (isString(explorerUrl)) {
        const tx = isEvmNetwork ? '/tx/' : '/';

        return Linking.openURL(`${explorerUrl}${tx}${transactionResponse.hash}`);
      }
    };

    showSuccessToast({
      message: 'Success!',
      data: {
        description: (
          <ToastDescription
            message="Transaction request sent! Confirming..."
            opHash={transactionResponse.hash}
            onPress={onBlockchainExplorerPress}
          />
        )
      }
    });

    if (isNotEmptyString(token.tokenAddress) && isNotEmptyString(token.tokenId)) {
      dispatch(
        addTransactionAction({
          from: publicKeyHash,
          to: receiverPublicKeyHash,
          transactionHash: transactionResponse.hash,
          token
        })
      );
    }

    setIsTransactionLoading(false);

    if (isEvmNetwork) {
      additionalSuccessCallback?.(transactionResponse as TransactionResponse);
    }

    if (operation === OperationsEnum.Approve && !isDAppOperation) {
      navigate(ScreensEnum.Swap);

      dispatch(waitForApproveTxToBeSuccessAction.submit({ token, txHash: transactionResponse.hash }));
    } else {
      navigate(ScreensEnum.Wallet);
    }
  };

  const errorCallback = () => {
    showErrorToast({ message: 'Transaction failed. Try other params.' });

    setIsTransactionLoading(false);
  };

  return {
    isTransactionLoading,
    setIsTransactionLoading,
    successCallback,
    errorCallback
  };
};
