import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { Linking, Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { tabs } from 'webextension-polyfill';

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
import { connectDAppAction } from '../../../store/d-apps/d-apps.actions';
import {
  useGasTokenSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedAccountSelector
} from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { handleCopyToClipboard } from '../../../utils/copy-to-clipboard.util';
import { createDAppResponse } from '../../../utils/dapp.utils';
import { eraseProtocol } from '../../../utils/string.util';
import { getFormattedBalance } from '../../../utils/units.utils';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { DAppImage } from './d-app-image/d-app-image';
import { styles } from './d-app-connection-confirmation.styles';

const rules: AllowsRules[] = [
  { text: 'See wallet balance and activity', isAllowed: true },
  { text: 'Send request for transactions', isAllowed: true },
  { text: 'Move funds without permissions', isAllowed: false }
];

export const DAppConnectionConfirmation: FC = () => {
  const dispatch = useDispatch();
  const selectedAccountPublicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { name } = useSelectedAccountSelector();
  const { decimals, symbol, balance } = useGasTokenSelector();
  const { navigate } = useNavigation();

  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.DAppConnectionConfirmation>>();

  const gasBalance = getFormattedBalance(balance.data, decimals);

  const sendMessage = () => {
    tabs.query({ active: true }).then(queryTabs => {
      if (queryTabs[0].id !== undefined) {
        dispatch(connectDAppAction({ dAppInfo: params.dAppInfo, accountPublicKeyHash: selectedAccountPublicKeyHash }));

        const message = createDAppResponse(params.messageId, [selectedAccountPublicKeyHash]);
        tabs.sendMessage(queryTabs[0].id, message);

        setTimeout(window.close, 1000);
      }
    });
  };

  const navigateToAccountsSelector = () => navigate(ScreensEnum.AccountsSelector);
  const navigateToWalletScreen = () => navigate(ScreensEnum.Wallet);
  const copy = () => handleCopyToClipboard(params.dAppInfo.origin);

  return (
    <ModalContainer screenTitle="Confirm operation">
      <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
        <View style={styles.viewRoot}>
          <Row style={styles.container}>
            <DAppImage imageUri={params.dAppInfo.favicon} />
            <Icon name={IconNameEnum.SwapItems} size={getCustomSize(9)} />
            <DAppImage />
          </Row>
          <Row style={styles.addressRow}>
            <Text style={styles.smallText}>Address</Text>
            <Row>
              <Text
                style={styles.explorerLink}
                onPress={() => Linking.openURL(params.dAppInfo.origin)}
                numberOfLines={1}
              >
                {eraseProtocol(params.dAppInfo.origin)}
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
                    <RobotIcon seed={selectedAccountPublicKeyHash} />
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
                <CopyText style={styles.address} text={selectedAccountPublicKeyHash} isShortize />
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
