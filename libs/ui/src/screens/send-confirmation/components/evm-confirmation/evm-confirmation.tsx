import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isDefined } from '@rnw-community/shared';
import React, { FC, PropsWithChildren } from 'react';

import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { sendErrorToDAppAndClosePopup, sendResponseToDAppAndClosePopup } from '../../../../utils/dapp.utils';
import { EvmTransferParams } from '../../types';

import { EvmConfirmationContainer } from './components/evm-confirmation-container/evm-confirmation-container';

type Props = PropsWithChildren<{
  transferParams: EvmTransferParams;
  messageID?: string;
}>;

export const EvmConfirmation: FC<Props> = ({ transferParams, messageID, children }) => {
  const { goBack } = useNavigation();

  const additionalSuccessCallback = (transactionResponse: TransactionResponse) => {
    if (isDefined(messageID)) {
      sendResponseToDAppAndClosePopup(messageID, transactionResponse.hash);
    }
  };

  const onDecline = () => {
    if (isDefined(messageID)) {
      sendErrorToDAppAndClosePopup(messageID);
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
