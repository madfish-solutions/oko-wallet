import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { Linking, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { removeDAppConnectionAction } from '../../../store/d-apps/d-apps.actions';
import { useDAppSelector } from '../../../store/d-apps/d-apps.selectors';
import { useSelectedAccountPublicKeyHashSelector } from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { sendNotificationToDApp } from '../../../utils/dapp.utils';
import { eraseProtocol } from '../../../utils/string.util';
import { ModalActionsContainer } from '../../components/modal-actions-container/modal-actions-container';

import { styles } from './delete-d-app.styles';

export const DeleteDApp: FC = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DeleteDApp>>();
  const dAppInfo = useDAppSelector(params.origin);

  const confirmDAppDelete = () => {
    dispatch(removeDAppConnectionAction({ dAppInfo, accountPublicKeyHash: publicKeyHash }));
    sendNotificationToDApp(params.origin, 'oko_accountsChanged', []);

    goBack();
  };

  return (
    <ModalActionsContainer
      screenTitle="Confirm disconnection"
      submitTitle="YES"
      cancelTitle="NO"
      onSubmitPress={confirmDAppDelete}
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
    </ModalActionsContainer>
  );
};
