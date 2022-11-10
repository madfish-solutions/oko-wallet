import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { View, Linking, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';

import { AllowsBlock } from '../../../components/allows-block/allows-block';
import { Button } from '../../../components/button/button';
import { ButtonThemesEnum } from '../../../components/button/enums';
import { Column } from '../../../components/column/column';
import { CopyText } from '../../../components/copy-text/copy-text';
import { IconWithBorder } from '../../../components/icon-with-border/icon-with-border';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { RobotIcon } from '../../../components/robot-icon/robot-icon';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { AllowsRules } from '../../../interfaces/dapp-connection.interface';
import { updateDappInfo } from '../../../store/dapps/dapps.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedAccountSelector,
  useSelectedNetworkSelector,
  useGasTokenSelector
} from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { handleCopyToClipboard } from '../../../utils/copy-to-clipboard.util';
import { eraseProtocol } from '../../../utils/string.util';
import { getFormattedBalance } from '../../../utils/units.utils';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { DappImage } from './components/dapp-image';
import { styles } from './dapp-confirmation.styles';

const CLOSE_DELAY = 1000;

interface MessageToDapp {
  data: unknown;
  target: string;
  dappName: string;
}

const rules: AllowsRules[] = [
  { text: 'See wallet balance and activity', isAllowed: true },
  { text: 'Send request for transactions', isAllowed: true },
  { text: 'Move funds without permissions', isAllowed: false }
];

export const DappConfirmation: FC = () => {
  const dispatch = useDispatch();
  const selectedAddress = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();
  const { name } = useSelectedAccountSelector();
  const { decimals, symbol, balance } = useGasTokenSelector();
  const { navigate } = useNavigation();
  const {
    params: { dappName, id, logo }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DappConfirmation>>();
  const responseToDapp: MessageToDapp = {
    data: {
      data: { id: Number(id), method: 'eth_requestAccounts', jsonrpc: '2.0', result: [selectedAddress] },
      name: 'metamask-provider'
    },
    target: 'metamask-inpage',
    dappName
  };
  const gasBalance = getFormattedBalance(balance.data, decimals);

  const sendMessage = () => {
    browser.tabs.query({ active: true }).then(tabs => {
      if (tabs[0].id !== undefined) {
        browser.tabs.sendMessage(tabs[0].id, responseToDapp);
        const hexChainId = `0x${Number(chainId).toString(16)}`;
        dispatch(updateDappInfo({ name: dappName, chainId: hexChainId, address: selectedAddress, logoUrl: logo }));
        setTimeout(() => {
          window.close();
        }, CLOSE_DELAY);
      }
    });
  };

  const navigateToAccountsSelector = () => navigate(ScreensEnum.AccountsSelector);
  const navigateToWalletScreen = () => navigate(ScreensEnum.Wallet);
  const copy = () => handleCopyToClipboard(dappName);

  return (
    <ModalContainer screenTitle="Confirm operation">
      <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
        <View style={styles.viewRoot}>
          <Row style={styles.container}>
            <DappImage imageUri={logo} />
            <Icon name={IconNameEnum.SwapItems} size={getCustomSize(9)} />
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
          <Text style={[styles.smallText, styles.from]}>From</Text>
          <View style={styles.accountSelector}>
            <Row style={styles.selectorRow}>
              <Row>
                <TouchableOpacity onPress={navigateToAccountsSelector} style={styles.button}>
                  <IconWithBorder>
                    <RobotIcon seed={selectedAddress} />
                  </IconWithBorder>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToAccountsSelector}>
                  <Row>
                    <Text style={styles.accountName}>{name}</Text>
                    <Icon name={IconNameEnum.Dropdown} size={getCustomSize(2)} />
                  </Row>
                </TouchableOpacity>
              </Row>
            </Row>
            <Row>
              <Row style={styles.bottomContainer}>
                <Column>
                  <Text style={styles.gasBalanceTitle}>Gas Balance</Text>
                  <Row>
                    <Text style={styles.gasBalance}>{`${gasBalance} ${symbol}`}</Text>
                    <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />
                  </Row>
                </Column>
                <CopyText style={styles.address} text={selectedAddress} isShortize />
              </Row>
            </Row>
          </View>
          <AllowsBlock rules={rules} />
        </View>
      </ScrollView>
      <Row style={styles.buttonPanel}>
        <Button onPress={navigateToWalletScreen} theme={ButtonThemesEnum.Primary} title="Decline" />
        <Button onPress={sendMessage} theme={ButtonThemesEnum.Secondary} title="Connect" />
      </Row>
    </ModalContainer>
  );
};
