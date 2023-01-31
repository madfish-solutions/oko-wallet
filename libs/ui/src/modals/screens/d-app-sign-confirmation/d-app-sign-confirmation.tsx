import { RouteProp, useRoute } from '@react-navigation/native';
import { ethers } from 'ethers';
import React, { FC } from 'react';
import { View } from 'react-native';

import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useClosePopup } from '../../../hooks/use-close-popup';
import { useShelter } from '../../../hooks/use-shelter.hook';
import { ModalActionContainer } from '../../../modals/components/modal-action-container/modal-action-container';
import { FromAccount } from '../../../screens/send-confirmation/components/confirmation/components/from-account/from-account';
import { SelectedNetwork } from '../../../screens/send-confirmation/components/confirmation/components/selected-network/selected-network';
import { useSelectedAccountSelector } from '../../../store/wallet/wallet.selectors';
import {
  sendErrorToDAppAndClosePopup,
  sendMessageToBackground,
  sendResponseToDAppAndClosePopup
} from '../../../utils/dapp.utils';
import { DAppHeader } from '../d-app-connection-confirmation/d-app-header/d-app-header';

import { styles } from './d-app-sign-confirmation.styles';

export const DAppSignConfirmation: FC = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DAppSignConfirmation>>();
  const selectedAccount = useSelectedAccountSelector();
  const { signMessage } = useShelter();
  useClosePopup(params.messageId, params.dAppInfo.origin);

  const onDecline = () => sendErrorToDAppAndClosePopup(params.dAppInfo.origin, params.messageId);

  const onSubmit = () => {
    signMessage({
      publicKey: selectedAccount.networksKeys.EVM?.publicKeyHash ?? '',
      messageToSign: params.signInfo[0],
      successCallback: message => sendResponseToDAppAndClosePopup(params.dAppInfo.origin, params.messageId, message)
    });
    sendMessageToBackground();
  };

  return (
    <ModalActionContainer
      screenTitle="Confirm Sign"
      submitTitle="Sign"
      cancelTitle="Decline"
      onSubmitPress={onSubmit}
      onCancelPress={onDecline}
      isBackButton={false}
    >
      <DAppHeader favicon={params.dAppInfo.favicon} origin={params.dAppInfo.origin} />
      <View style={styles.messageBlock}>
        <Text style={styles.mainText}>Message to sign</Text>
        <Text style={styles.text}>{ethers.utils.toUtf8String(params.signInfo[0])}</Text>
      </View>
      <FromAccount account={selectedAccount} />
      <SelectedNetwork />
    </ModalActionContainer>
  );
};
