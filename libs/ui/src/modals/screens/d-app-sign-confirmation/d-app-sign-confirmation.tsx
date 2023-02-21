import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';

import { Text } from '../../../components/text/text';
import { DAppMethodEnum } from '../../../enums/dApp-method.enum';
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

export const DAppSignConfirmation: FC = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DAppSignConfirmation>>();
  const selectedAccount = useSelectedAccountSelector();
  const { signMessage } = useShelter();
  useClosePopup(params.messageId, params.dAppInfo.origin);

  const onDecline = () => sendErrorToDAppAndClosePopup(params.dAppInfo.origin, params.messageId);

  const messageToSign = (method: string) => {
    switch (method) {
      case DAppMethodEnum.ETH_PERSONAL_SIGN: {
        return params.signInfo[0];
      }
      case DAppMethodEnum.ETH_SIGN_TYPED_DATA: {
        return JSON.stringify(params.signInfo[0]);
      }
      case DAppMethodEnum.ETH_SIGN_TYPED_DATA_V3:
      case DAppMethodEnum.ETH_SIGN_TYPED_DATA_V4: {
        return params.signInfo[1];
      }
      case DAppMethodEnum.ETH_SIGN: {
        return params.signInfo[1];
      }
      default: {
        throw Error('method is not acceptable');
      }
    }
  };

  const onSubmit = () => {
    signMessage({
      publicKey: selectedAccount.networksKeys.EVM?.publicKeyHash ?? '',
      messageToSign: prepareSignData(messageToSign(params.method)),
      method: params.method,
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
        <Text style={styles.text}>{prepareSignData(messageToSign(params.method))}</Text>
      </View>
      <FromAccount account={selectedAccount} />
      <SelectedNetwork />
    </ModalActionContainer>
  );
};
