import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { View, Linking, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';

import { Button } from '../../../components/button/button';
import { ButtonThemesEnum } from '../../../components/button/enums';
import { Divider } from '../../../components/divider/divider';
import { IconWithBorder } from '../../../components/icon-with-border/icon-with-border';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { RobotIcon } from '../../../components/robot-icon/robot-icon';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { setConfirmedDapp } from '../../../store/wallet/wallet.actions';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedAccountSelector
} from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { shortize } from '../../../utils/shortize.util';
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
  const selectedAddress = useSelectedAccountPublicKeyHashSelector();
  const { name } = useSelectedAccountSelector();
  const { navigate } = useNavigation();
  const {
    params: { dappName, id }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DappConfirmation>>();
  const responseToDapp: MessageToDapp = {
    data: {
      data: { id, method: 'eth_requestAccounts', jsonrpc: '2.0', result: [selectedAddress] },
      name: 'metamask-provider'
    },
    target: 'metamask-inpage'
  };

  const sendMessage = () => {
    browser.tabs.query({ active: true }).then(tabs => {
      if (tabs[0].id !== undefined) {
        browser.tabs.sendMessage(tabs[0].id, responseToDapp);
        setTimeout(() => {
          window.close();
        }, CLOSE_DELAY);
        dispatch(setConfirmedDapp({ dappName, id }));
      }
    });
  };

  const selectAccount = () => navigate(ScreensEnum.AccountsSelector);

  return (
    <ModalContainer screenTitle="Confirmation">
      <View style={styles.root}>
        <Row style={styles.container}>
          <DappImage image="" />
          <Icon name={IconNameEnum.SwapItems} size={getCustomSize(9)} />
          <DappImage image="" />
        </Row>
        <Row style={styles.addressRow}>
          <Text style={styles.smallText}>Address</Text>
          <Row>
            <Text style={styles.explorerLink} onPress={() => Linking.openURL('')} numberOfLines={1}>
              {dappName}
            </Text>
            <Icon name={IconNameEnum.Copy} />
          </Row>
        </Row>
        <View style={styles.divider} />
        <Text style={[styles.smallText, styles.from]}>From</Text>
        <View style={styles.accountSelector}>
          <Row style={styles.selectorRow}>
            <Row>
              <TouchableOpacity onPress={selectAccount} style={styles.button}>
                <IconWithBorder>
                  <RobotIcon seed={selectedAddress} />
                </IconWithBorder>
              </TouchableOpacity>
              <TouchableOpacity onPress={selectAccount}>
                <Row>
                  <Text style={styles.accName}>{name}</Text>
                  <Icon name={IconNameEnum.Dropdown} size={getCustomSize(2)} />
                </Row>
              </TouchableOpacity>
            </Row>
            <Text style={styles.address}>{shortize(selectedAddress)}</Text>
          </Row>
          <Row>
            <View>
              <Text style={styles.gasBalanceTitle}>Gas Balance</Text>
              <Row>
                <Text style={styles.gasBalance}>404.03231 M SYMBL </Text>
                <Icon name={IconNameEnum.Gas} size={getCustomSize(2)} />
              </Row>
            </View>
          </Row>
        </View>
        <ScrollView style={styles.allowsBlock}>
          <Text style={styles.greyLabel}>Allows</Text>
          <Row style={styles.allowsText}>
            <Text style={styles.greyText}>See wallet balance activity</Text>
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
        </ScrollView>
        <Row style={styles.buttonPanel}>
          <Button theme={ButtonThemesEnum.Primary} title="Decline" />
          <Button onPress={sendMessage} theme={ButtonThemesEnum.Secondary} title="Connect" />
        </Row>
      </View>
    </ModalContainer>
  );
};
