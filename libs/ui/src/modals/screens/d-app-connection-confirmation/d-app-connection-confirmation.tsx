import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { AllowsBlock } from '../../../components/allows-block/allows-block';
import { Button } from '../../../components/button/button';
import { ButtonThemesEnum } from '../../../components/button/enums';
import { Column } from '../../../components/column/column';
import { CopyText } from '../../../components/copy-text/copy-text';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { IconWithBorder } from '../../../components/icon-with-border/icon-with-border';
import { RobotIcon } from '../../../components/robot-icon/robot-icon';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useClosePopup } from '../../../hooks/use-close-popup';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { AllowsRules } from '../../../interfaces/dapp-connection.interface';
import { connectDAppAction } from '../../../store/d-apps/d-apps.actions';
import {
  useGasTokenSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedAccountSelector
} from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import {
  sendErrorToDAppAndClosePopup,
  sendMessageToBackground,
  sendNotificationToDApp,
  sendResponseToDAppAndClosePopup
} from '../../../utils/dapp.utils';
import { getFormattedBalance } from '../../../utils/units.utils';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './d-app-connection-confirmation.styles';
import { DAppHeader } from './d-app-header/d-app-header';

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

  useClosePopup(params.messageId, params.dAppInfo.origin);

  const gasBalance = getFormattedBalance(balance.data, decimals);

  const sendMessage = () => {
    dispatch(connectDAppAction({ dAppInfo: params.dAppInfo, accountPublicKeyHash: selectedAccountPublicKeyHash }));
    sendNotificationToDApp(params.dAppInfo.origin, 'oko_accountsChanged', [selectedAccountPublicKeyHash]);
    sendResponseToDAppAndClosePopup(params.dAppInfo.origin, params.messageId, [selectedAccountPublicKeyHash]);
    sendMessageToBackground();
  };

  const navigateToAccountsSelector = () => navigate(ScreensEnum.AccountsSelector);
  const declineConnection = () => sendErrorToDAppAndClosePopup(params.dAppInfo.origin, params.messageId);

  return (
    <ModalContainer screenTitle="Confirm operation">
      <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
        <View style={styles.viewRoot}>
          <DAppHeader favicon={params.dAppInfo.favicon} origin={params.dAppInfo.origin} />
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
        <Button onPress={declineConnection} theme={ButtonThemesEnum.Primary} title="Decline" />
        <Button onPress={sendMessage} theme={ButtonThemesEnum.Secondary} title="Connect" />
      </Row>
    </ModalContainer>
  );
};
