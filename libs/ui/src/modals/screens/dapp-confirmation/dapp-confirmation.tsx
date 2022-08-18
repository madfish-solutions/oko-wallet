import React, { FC, useState } from 'react';
import { View, Image, Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';

import { Divider } from '../../../components/divider/divider';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Row } from '../../../components/row/row';
import { Text } from '../../../components/text/text';
import {
  changeConfirmationScreenStatus,
  deletePendingConnection,
  setConfirmedDapp
} from '../../../store/wallet/wallet.actions';
import {
  usePendingDappConnectionSelector,
  useSelectedAccountPublicKeyHashSelector
} from '../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../styles/format-size';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './dapp-confirmation.styles';

interface Props {
  dappName: string;
}

const CLOSE_DELAY = 1000;

// onPress={() =>
//     sendMesg({
//       data: { data: { ...dappInfo[dappName].data, result: [selectedAcc] }, name: 'metamask-provider' },
//       target: 'metamask-inpage'
//     })

interface DappImageProps {
  image: string;
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
  const selectedAcc = useSelectedAccountPublicKeyHashSelector();
  const dappInfo = usePendingDappConnectionSelector();

  const sendMesg = (obj: unknown) => {
    browser.tabs.query({ active: true }).then(tabs => {
      if (tabs[0].id !== undefined) {
        browser.tabs.sendMessage(tabs[0].id, obj);
        setTimeout(() => {
          window.close();
        }, CLOSE_DELAY);
        dispatch(changeConfirmationScreenStatus(false));
        dispatch(deletePendingConnection(dappName));
        dispatch(setConfirmedDapp(dappInfo[dappName]));
      }
    });
  };

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
              qupuswap.com/fjajkkjajfjkfekjefjkfekjfekjefkjefkjfekjfekjefkjefkjefkjfekjfekjekjefkjfekjefkjfe
            </Text>
            <Icon name={IconNameEnum.Copy} />
          </Row>
        </Row>
        <View style={styles.divider} />
        <Text style={[styles.smallText, styles.from]}>From:</Text>
        <View>
          <Text>from select</Text>
        </View>
        <View>
          <Text>allows block</Text>
        </View>
      </View>
    </ModalContainer>
  );
};
