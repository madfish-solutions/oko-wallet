import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { ScrollView, Pressable, Linking, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';

import { AllowsBlock } from '../../../components/allows-block/allows-block';
import { Button } from '../../../components/button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../../../components/button/enums';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { AllowsRules } from '../../../interfaces/dapp-connection.interface';
import { changeNetworkAction } from '../../../store/wallet/wallet.actions';
import { handleCopyToClipboard } from '../../../utils/copy-to-clipboard.util';
import { eraseProtocol } from '../../../utils/string.util';
import { ModalContainer } from '../../components/modal-container/modal-container';
import { DappImage } from '../dapp-confirmation/components/dapp-image';

import { styles } from './change-network.styles';

const changeNetworkRules: AllowsRules[] = [
  { text: 'Switch the Network', isAllowed: true },
  { text: 'Move funds without permissions', isAllowed: false }
];

export const ChangeNetwork: FC = () => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const {
    params: { dappName, chainId, id }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.ChangeNetworkConfirmation>>();

  const navigateToWalletScreen = () => navigate(ScreensEnum.Wallet);
  const copy = () => handleCopyToClipboard(dappName);
  const responseToDapp = {
    data: {
      data: { id: Number(id), jsonrpc: '2.0', result: null },
      name: 'metamask-provider'
    },
    target: 'metamask-inpage'
  };

  const acceptChangeNetwork = () => {
    dispatch(changeNetworkAction(chainId.substring(2)));
    browser.tabs.query({ active: true }).then(tabs => {
      if (tabs[0].id !== undefined) {
        browser.tabs.sendMessage(tabs[0].id, responseToDapp);

        setTimeout(() => window.close(), 1000);
      }
    });
  };

  return (
    <ModalContainer screenTitle="Confirm change network">
      <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
        <Row style={styles.dappLogo}>
          <DappImage />
        </Row>
        <Row style={styles.addressRow}>
          <Text style={styles.smallText}>Address</Text>
          <Row>
            <Text style={styles.explorerLink} onPress={() => Linking.openURL(dappName)} numberOfLines={1}>
              {eraseProtocol(dappName)}
            </Text>
            <Pressable onPress={copy}>
              <Icon name={IconNameEnum.Copy} />
            </Pressable>
          </Row>
        </Row>
        <View style={styles.divider} />
        <Row style={styles.chainChange}>
          <DappImage />
          <Icon name={IconNameEnum.ArrowRight} />
          <DappImage />
        </Row>
        <View>
          <Text style={styles.grayText}>From</Text>
          <Row style={styles.chainSelector}>
            <DappImage size={ButtonSizeEnum.Small} />
            <Text style={styles.chainName}>PooChain</Text>
          </Row>
        </View>
        <View style={styles.addressTo}>
          <Text style={styles.grayText}>To</Text>
          <Row style={styles.chainSelector}>
            <DappImage size={ButtonSizeEnum.Small} />
            <Text style={styles.chainName}>{chainId}</Text>
          </Row>
        </View>
        <AllowsBlock rules={changeNetworkRules} />
      </ScrollView>
      <Row style={styles.buttonPanel}>
        <Button onPress={navigateToWalletScreen} theme={ButtonThemesEnum.Primary} title="Decline" />
        <Button theme={ButtonThemesEnum.Secondary} title="Confirm" onPress={acceptChangeNetwork} />
      </Row>
    </ModalContainer>
  );
};
