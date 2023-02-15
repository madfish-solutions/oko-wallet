import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';

import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useClosePopup } from '../../../hooks/use-close-popup';
import { useShelter } from '../../../hooks/use-shelter.hook';
import { FromAccount } from '../../../screens/send-confirmation/components/confirmation/components/from-account/from-account';
import { SelectedNetwork } from '../../../screens/send-confirmation/components/confirmation/components/selected-network/selected-network';
import { useSelectedAccountSelector } from '../../../store/wallet/wallet.selectors';
import {
  sendErrorToDAppAndClosePopup,
  sendMessageToBackground,
  sendResponseToDAppAndClosePopup
} from '../../../utils/dapp.utils';
import { ModalActionContainer } from '../../components/modal-action-container/modal-action-container';
import { DAppHeader } from '../d-app-connection-confirmation/d-app-header/d-app-header';

import { styles } from './d-app-sign-confirmation.styles';
import { prepareSignData } from './utils/prepare-sign-data';

const PERSONAL_SIGN_METHOD = 'personal_sign';

export const DAppSignConfirmation: FC = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DAppSignConfirmation>>();
  const selectedAccount = useSelectedAccountSelector();
  const { signMessage } = useShelter();
  useClosePopup(params.messageId, params.dAppInfo.origin);

  const onDecline = () => sendErrorToDAppAndClosePopup(params.dAppInfo.origin, params.messageId);

  const messageToSign = params.method === PERSONAL_SIGN_METHOD ? params.signInfo[0] : params.signInfo[1];

  const onSubmit = () => {
    signMessage({
      publicKey: selectedAccount.networksKeys.EVM?.publicKeyHash ?? '',
      messageToSign: prepareSignData(messageToSign),
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
        <Text style={styles.text}>{prepareSignData(messageToSign)}</Text>
      </View>
      <FromAccount account={selectedAccount} />
      <SelectedNetwork />
    </ModalActionContainer>
  );
};
