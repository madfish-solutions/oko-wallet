import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { Linking, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { removeDAppConnectionAction } from '../../../store/dapps/dapps.actions';
import { useSelectedAccountPublicKeyHashSelector } from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { eraseProtocol } from '../../../utils/string.util';
import { ModalActionContainer } from '../../components/modal-action-container/modal-action-container';

import { styles } from './delete-app.styles';

export const DeleteDapp: FC = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DeleteDapp>>();

  const confirmDeleteDapp = () => {
    dispatch(removeDAppConnectionAction({ dAppOrigin: params.origin, accountPublicKeyHash: publicKeyHash }));
    goBack();
  };

  return (
    <ModalActionContainer
      screenTitle="Confirm disconnection"
      submitTitle="YES"
      cancelTitle="NO"
      onSubmitPress={confirmDeleteDapp}
      onCancelPress={goBack}
    >
      <View style={styles.container}>
        <Icon name={IconNameEnum.IconDisconnect} size={getCustomSize(12)} iconStyle={styles.icon} />
        <Text style={styles.link} onPress={() => Linking.openURL(params.origin)} numberOfLines={1}>
          {eraseProtocol(params.origin)}
        </Text>
        <Text style={styles.label}>Are you sure?</Text>
        <Text style={styles.text}>You wanna remove connection with this DApp, Confirm it?</Text>
      </View>
    </ModalActionContainer>
  );
};
