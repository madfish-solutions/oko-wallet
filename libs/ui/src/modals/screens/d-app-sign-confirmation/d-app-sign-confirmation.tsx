import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';

import { InfoBox } from '../../../components/info-box/info-box';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useClosePopup } from '../../../hooks/use-close-popup';
import { FromAccount } from '../../../screens/send-confirmation/components/confirmation/components/from-account/from-account';
import { SelectedNetwork } from '../../../screens/send-confirmation/components/confirmation/components/selected-network/selected-network';
import { useSignMessage } from '../../../shelter/hooks/use-sign-message.hook';
import { useSelectedAccountSelector } from '../../../store/wallet/wallet.selectors';
import {
  sendErrorToDAppAndClosePopup,
  sendMessageToBackground,
  sendResponseToDAppAndClosePopup
} from '../../../utils/dapp.utils';
import { ModalActionsContainer } from '../../components/modal-actions-container/modal-actions-container';
import { DAppHeader } from '../d-app-connection-confirmation/d-app-header/d-app-header';

import { getMessageToSign } from './utils/prepare-sign-data';

export const DAppSignConfirmation: FC = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DAppSignConfirmation>>();
  const selectedAccount = useSelectedAccountSelector();
  const signMessage = useSignMessage();
  useClosePopup(params.messageId, params.dAppInfo.origin);

  const onDecline = () => sendErrorToDAppAndClosePopup(params.dAppInfo.origin, params.messageId);

  const messageToSign = getMessageToSign(params.method, params.signInfo);

  const onSubmit = () => {
    signMessage({
      publicKey: selectedAccount.networksKeys.EVM?.publicKeyHash ?? '',
      messageToSign,
      method: params.method,
      successCallback: message => sendResponseToDAppAndClosePopup(params.dAppInfo.origin, params.messageId, message)
    });
    sendMessageToBackground();
  };

  return (
    <ModalActionsContainer
      screenTitle="Confirm Sign"
      submitTitle="Sign"
      cancelTitle="Decline"
      onSubmitPress={onSubmit}
      onCancelPress={onDecline}
      isBackButton={false}
    >
      <DAppHeader favicon={params.dAppInfo.favicon} origin={params.dAppInfo.origin} />

      <InfoBox title="Message to sign" description={messageToSign} />
      <FromAccount account={selectedAccount} />

      <SelectedNetwork />
    </ModalActionsContainer>
  );
};
