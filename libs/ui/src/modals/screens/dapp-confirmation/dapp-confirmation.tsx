import React, { FC, useState } from 'react';
import { View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { browser } from 'webextension-polyfill-ts';

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
        <Icon name={IconNameEnum.IconPlaceholder} />
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
      <Row style={styles.container}>
        <DappImage image="" />
        <Icon name={IconNameEnum.SwapItems} size={getCustomSize(8)} />
        <DappImage image="" />
      </Row>
      <View>
        <Text>image block</Text>
      </View>
      <View>
        <Text>address</Text>
      </View>
      <View>
        <Text>from select</Text>
      </View>
      <View>
        <Text>allows block</Text>
      </View>
    </ModalContainer>
  );
};
