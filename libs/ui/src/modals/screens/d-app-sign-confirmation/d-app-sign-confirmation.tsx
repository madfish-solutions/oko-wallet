import { RouteProp, useRoute } from '@react-navigation/native';
import { ethers, Wallet } from 'ethers';
import React, { FC } from 'react';
import { View } from 'react-native';

import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useShelter } from '../../../hooks/use-shelter.hook';
import { ModalActionContainer } from '../../../modals/components/modal-action-container/modal-action-container';
import { FromAccount } from '../../../screens/send-confirmation/components/confirmation/components/from-account/from-account';
import { SelectedNetwork } from '../../../screens/send-confirmation/components/confirmation/components/selected-network/selected-network';
import { useSelectedAccountSelector } from '../../../store/wallet/wallet.selectors';
import { createErrorMessage, sendResponseToDAppAndClosePopup } from '../../../utils/dapp.utils';
import { DAppHeader } from '../d-app-connection-confirmation/d-app-header/d-app-header';

import { styles } from './d-app-sign-confirmation.styles';

export const DAppSignConfirmation: FC = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DAppSignConfirmation>>();
  const selectedAccount = useSelectedAccountSelector();
  const { revealPrivateKey } = useShelter();

  const signMessage = () =>
    revealPrivateKey({
      publicKeyHash: selectedAccount.networksKeys.EVM?.publicKeyHash ?? '',
      successCallback: async privateKey => {
        const signer = new Wallet(privateKey);
        const signedMsg = await signer.signMessage(ethers.utils.toUtf8String(params.signInfo[0]));
        sendResponseToDAppAndClosePopup(params.messageId, signedMsg);
      }
    });

  const declineMessage = () => createErrorMessage(params.messageId);

  return (
    <ModalActionContainer
      screenTitle="Confirm Sign"
      submitTitle="Sign"
      cancelTitle="Decline"
      onSubmitPress={signMessage}
      onCancelPress={declineMessage}
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
