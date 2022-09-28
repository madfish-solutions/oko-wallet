import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { Linking, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { ModalActionContainer } from '../../../modals/components/modal-action-container/modal-action-container';
import { deleteConfirmedDappAction } from '../../../store/wallet/wallet.actions';
import { getCustomSize } from '../../../styles/format-size';
import { eraseProtocol } from '../../../utils/string.util';

import { styles } from './delete-app.styles';

export const DeleteDapp: FC = () => {
  const {
    params: { dappName }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DappConfirmation>>();
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const confirmDeleteDapp = () => {
    dispatch(deleteConfirmedDappAction(dappName));
    goBack();
  };

  return (
    <ModalActionContainer
      screenTitle="confirm disconnection"
      submitTitle="YES"
      cancelTitle="NO"
      onSubmitPress={confirmDeleteDapp}
      onCancelPress={goBack}
    >
      <View style={styles.container}>
        <Icon name={IconNameEnum.IconDisconnect} size={getCustomSize(12)} iconStyle={styles.icon} />
        <Text style={styles.link} onPress={() => Linking.openURL(dappName)} numberOfLines={1}>
          {eraseProtocol(dappName)}
        </Text>
        <Text style={styles.label}>Are you sure?</Text>
        <Text style={styles.text}>You wanna remove connection with this Dapp, Confirm it?</Text>
      </View>
    </ModalActionContainer>
  );
};
