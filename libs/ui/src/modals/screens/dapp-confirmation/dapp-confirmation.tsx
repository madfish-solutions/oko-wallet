import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { View, Linking, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';

import { Button } from '../../../components/button/button';
import { ButtonThemesEnum } from '../../../components/button/enums';
import { Column } from '../../../components/column/column';
import { CopyText } from '../../../components/copy-text/copy-text';
import { Divider } from '../../../components/divider/divider';
import { IconWithBorder } from '../../../components/icon-with-border/icon-with-border';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { RobotIcon } from '../../../components/robot-icon/robot-icon';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { setConfirmedDappAction } from '../../../store/wallet/wallet.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedAccountSelector,
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
}

export const DappConfirmation: FC = () => {
  const dispatch = useDispatch();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { name } = useSelectedAccountSelector();
  const { decimals, symbol, balance } = useGasTokenSelector();
  const { navigate } = useNavigation();
  const {
    params: { dappName, id }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DappConfirmation>>();
  const responseToDapp: MessageToDapp = {
    data: {
      data: { id, method: 'eth_requestAccounts', jsonrpc: '2.0', result: [publicKeyHash] },
      name: 'metamask-provider'
    },
    target: 'metamask-inpage'
  };
  const gasBalance = getFormattedBalance(balance.data, decimals);

  const sendMessage = () => {
    browser.tabs.query({ active: true }).then(tabs => {
      if (tabs[0].id !== undefined) {
        browser.tabs.sendMessage(tabs[0].id, responseToDapp);
        setTimeout(() => {
          window.close();
        }, CLOSE_DELAY);
        dispatch(setConfirmedDappAction({ dappName, id }));
      }
    });
  };

  const navigateToAccountsSelector = () => navigate(ScreensEnum.AccountsSelector);
  const navigateToWalletScreen = () => navigate(ScreensEnum.Wallet);
  const copy = () => handleCopyToClipboard(dappName);

  return (
    <ModalContainer screenTitle="Confirm operation">
      <ScrollView style={styles.root}>
        <View style={styles.viewRoot}>
          <Row style={styles.container}>
            <DappImage />
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
                    <RobotIcon seed={publicKeyHash} />
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
                <CopyText style={styles.address} text={publicKeyHash} isShortize />
              </Row>
            </Row>
          </View>
          <View style={styles.allowsBlock}>
            <Text style={styles.greyLabel}>Allows</Text>
            <Row style={styles.allowsText}>
              <Text style={styles.greyText}>See wallet balance and activity</Text>
              <Row>
                <Text style={styles.allowStatus}>ALLOWED</Text>
                <Icon name={IconNameEnum.LockOpen} />
              </Row>
            </Row>
            <Divider style={styles.divider} />
            <Row style={styles.allowsText}>
              <Text style={styles.greyText}>Send request for transactions</Text>
              <Row>
                <Text style={styles.allowStatus}>ALLOWED</Text>
                <Icon name={IconNameEnum.LockOpen} />
              </Row>
            </Row>
            <Divider style={styles.divider} />
            <Row style={styles.allowsText}>
              <Text style={styles.greyText}>Move funds without permissions</Text>
              <Row>
                <Text style={styles.allowStatus}>BLOCKED</Text>
                <Icon name={IconNameEnum.LockClosed} />
              </Row>
            </Row>
            <Divider style={styles.divider} />
          </View>
        </View>
      </ScrollView>
      <Row style={styles.buttonPanel}>
        <Button onPress={navigateToWalletScreen} theme={ButtonThemesEnum.Primary} title="Decline" />
        <Button onPress={sendMessage} theme={ButtonThemesEnum.Secondary} title="Connect" />
      </Row>
    </ModalContainer>
  );
};
