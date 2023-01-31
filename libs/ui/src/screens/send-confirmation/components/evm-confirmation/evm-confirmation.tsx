import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isDefined } from '@rnw-community/shared';
import React, { FC, PropsWithChildren } from 'react';

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

  const additionalSuccessCallback = (transactionResponse: TransactionResponse) => {
    if (isDefined(params)) {
      sendResponseToDAppAndClosePopup(params.messageId, transactionResponse.hash, params.dAppInfo.origin);
      sendMessageToBackground();
    }
  };

  const onDecline = () => {
    if (isDefined(params)) {
      sendErrorToDAppAndClosePopup(params.messageId, params.dAppInfo.origin);
    }

    goBack();
  };

  return (
    <EvmConfirmationContainer
      transferParams={transferParams}
      onDecline={onDecline}
      additionalSuccessCallback={additionalSuccessCallback}
      children={children}
    />
  );
};
