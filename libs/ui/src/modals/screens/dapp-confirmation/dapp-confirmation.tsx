import React, { FC, useState } from 'react';
import { View, Image, Linking, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';

import { Button } from '../../../components/button/button';
import { ButtonThemesEnum } from '../../../components/button/enums';
import { IconWithBorder } from '../../../components/icon-with-border/icon-with-border';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { RobotIcon } from '../../../components/robot-icon/robot-icon';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import {
  changeConfirmationScreenStatus,
  deletePendingConnection,
  setConfirmedDapp
} from '../../../store/wallet/wallet.actions';
import {
  usePendingDappConnectionSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedAccountSelector
} from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { shortize } from '../../../utils/shortize.util';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './dapp-confirmation.styles';

interface Props {
  dappName: string;
}

const CLOSE_DELAY = 1000;

interface DappImageProps {
  image: string;
}

interface MessageToDapp {
  data: unknown;
  target: string;
}

const DappImage: FC<DappImageProps> = ({ image }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  return (
    <View style={styles.imageContainer}>
      {showPlaceholder ? (
        <Image source={{ uri: image }} onError={() => setShowPlaceholder(true)} />
      ) : (
        <Icon name={IconNameEnum.IconPlaceholder} size={getCustomSize(2.5)} />
      )}
    </View>
  );
};

export const DappConfirmation: FC<Props> = ({ dappName }) => {
  const dispatch = useDispatch();
  const selectedAddress = useSelectedAccountPublicKeyHashSelector();
  const dappInfo = usePendingDappConnectionSelector();
  const { navigate } = useNavigation();
  const objToDapp: MessageToDapp = {
    data: {
      data: { ...dappInfo[dappName].data, method: 'eth_requestAccounts', jsonrpc: '2.0', result: [selectedAddress] },
      name: 'metamask-provider'
    },
    target: 'metamask-inpage'
  };

  console.log(dappInfo, 'DAPP INFO');
  const sendMessage = () => {
    browser.tabs.query({ active: true }).then(tabs => {
      if (tabs[0].id !== undefined) {
        browser.tabs.sendMessage(tabs[0].id, objToDapp);
        setTimeout(() => {
          window.close();
        }, CLOSE_DELAY);
        dispatch(changeConfirmationScreenStatus(false));
        dispatch(deletePendingConnection(dappName));
        dispatch(setConfirmedDapp(dappInfo[dappName]));
      }
    });
  };

  const selectedAccount = useSelectedAccountSelector();
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
              {dappInfo[dappName].dappName}
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
                  <Text style={styles.accName}>{selectedAccount.name}</Text>
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
        <Row style={styles.buttonPanel}>
          <Button theme={ButtonThemesEnum.Primary} title="Decline" />
          <Button onPress={sendMessage} theme={ButtonThemesEnum.Secondary} title="Send" />
        </Row>
      </View>
    </ModalContainer>
  );
};
