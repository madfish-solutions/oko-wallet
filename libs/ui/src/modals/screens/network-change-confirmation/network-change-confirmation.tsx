import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import React, { FC, useMemo } from 'react';
import { ScrollView, Pressable, Linking, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { AllowsBlock } from '../../../components/allows-block/allows-block';
import { Button } from '../../../components/button/button';
import { ButtonThemesEnum } from '../../../components/button/enums';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { IconWithBorderEnum } from '../../../components/icon-with-border/enums';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useClosePopup } from '../../../hooks/use-close-popup';
import { AllowsRules } from '../../../interfaces/dapp-connection.interface';
import { useDAppSelector } from '../../../store/d-apps/d-apps.selectors';
import { showLoaderAction } from '../../../store/settings/settings.actions';
import { useShowLoaderSelector } from '../../../store/settings/settings.selectors';
import { changeNetworkAction } from '../../../store/wallet/wallet.actions';
import { useAllNetworksSelector, useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import {
  sendErrorToDAppAndClosePopup,
  sendMessageToBackground,
  sendResponseToDAppAndClosePopup
} from '../../../utils/dapp.utils';
import { eraseProtocol } from '../../../utils/string.util';
import { ModalContainer } from '../../components/modal-container/modal-container';
import { DAppImage } from '../d-app-connection-confirmation/d-app-image/d-app-image';

import { NetworkImage } from './components/network-image/network-image';
import { styles } from './network-change-confirmation.styles';

const changeNetworkRules: AllowsRules[] = [
  { text: 'Switch the Network', isAllowed: true },
  { text: 'Move funds without permissions', isAllowed: false }
];

export const NetworkChangeConfirmation: FC = () => {
  const showLoader = useShowLoaderSelector();
  const selectedNetwork = useSelectedNetworkSelector();
  const initialSelectedNetwork = useMemo(() => selectedNetwork, []);
  const networks = useAllNetworksSelector();
  const dispatch = useDispatch();
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.NetworkChangeConfirmation>>();
  const dAppState = useDAppSelector(params.dAppOrigin);

  useClosePopup(params.messageId, params.dAppOrigin);

  const goToDappUrl = () => Linking.openURL(dAppState.origin);
  const dappsNetwork = networks.find(
    network => network.chainId === parseInt(params.requestedChainId.substring(2), 16).toString()
  );

  const onConfirm = () => {
    dispatch(showLoaderAction());

    if (isDefined(dappsNetwork)) {
      dispatch(changeNetworkAction(dappsNetwork?.rpcUrl));
    }
    sendResponseToDAppAndClosePopup(params.dAppOrigin, params.messageId, null);
    sendMessageToBackground();
  };
  const onDecline = () => sendErrorToDAppAndClosePopup(params.dAppOrigin, params.messageId);

  return (
    <ModalContainer screenTitle="Confirm Network Change" onHeaderCloseButtonPress={onDecline}>
      <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
        <Row style={styles.dappLogo}>
          <DAppImage imageUri={dAppState.favicon} />
        </Row>
        <Row style={styles.addressRow}>
          <Text style={styles.smallText}>Address</Text>
          <Pressable onPress={goToDappUrl}>
            <Row>
              <Text style={styles.explorerLink} numberOfLines={1}>
                {eraseProtocol(dAppState.origin)}
              </Text>
              <Icon name={IconNameEnum.Tooltip} />
            </Row>
          </Pressable>
        </Row>
        <View style={styles.divider} />
        <Row style={styles.chainChange}>
          <NetworkImage iconName={initialSelectedNetwork.iconName} type={IconWithBorderEnum.Quaternary} />
          <Icon name={IconNameEnum.ArrowRight} />
          <NetworkImage iconName={dappsNetwork?.iconName} type={IconWithBorderEnum.Quaternary} />
        </Row>
        <View>
          <Text style={styles.grayText}>From</Text>
          <Row style={styles.chainSelector}>
            <NetworkImage iconName={initialSelectedNetwork.iconName} />
            <Text style={styles.chainName}>{initialSelectedNetwork.name}</Text>
          </Row>
        </View>
        <View style={styles.addressTo}>
          <Text style={styles.grayText}>To</Text>
          <Row style={styles.chainSelector}>
            <NetworkImage iconName={dappsNetwork?.iconName} />
            <Text style={styles.chainName}>{dappsNetwork?.name}</Text>
          </Row>
        </View>
        <AllowsBlock rules={changeNetworkRules} />
      </ScrollView>
      <Row style={styles.buttonPanel}>
        <Button title="Decline" onPress={onDecline} disabled={showLoader} theme={ButtonThemesEnum.Primary} />
        <Button title="Confirm" onPress={onConfirm} disabled={showLoader} theme={ButtonThemesEnum.Secondary} />
      </Row>
    </ModalContainer>
  );
};
