import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isDefined } from '@rnw-community/shared';
import React, { FC, PropsWithChildren, useCallback } from 'react';

import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import {
  sendErrorToDAppAndClosePopup,
  sendMessageToBackground,
  sendResponseToDAppAndClosePopup
} from '../../../../utils/dapp.utils';
import { EvmTransferParams } from '../../types';

import { EvmConfirmationContainer } from './components/evm-confirmation-container/evm-confirmation-container';

type Props = PropsWithChildren<{
  transferParams: EvmTransferParams;
  params?: ScreensParamList[ScreensEnum.DAppTransactionConfirmation];
}>;

export const EvmConfirmation: FC<Props> = ({ transferParams, params, children }) => {
  const { goBack } = useNavigation();
  const isDAppOperation = isDefined(params);

  const additionalSuccessCallback = (transactionResponse: TransactionResponse) => {
    if (isDAppOperation) {
      sendResponseToDAppAndClosePopup(params.dAppInfo.origin, params.messageId, transactionResponse.hash);
      sendMessageToBackground();
    }
  };

  const onDecline = useCallback(() => {
    if (isDAppOperation) {
      sendErrorToDAppAndClosePopup(params.dAppInfo.origin, params.messageId);
    }

    goBack();
  }, [isDAppOperation, params?.dAppInfo?.origin, params?.messageId]);

  return (
    <EvmConfirmationContainer
      transferParams={transferParams}
      onDecline={onDecline}
      additionalSuccessCallback={additionalSuccessCallback}
      children={children}
      isDAppOperation={isDAppOperation}
    />
  );
};
