import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Announcement } from '../../../components/announcement/announcement';
import { Pressable } from '../../../components/pressable/pressable';
import { ProtectLayout } from '../../../components/protect-layout/protect-layout';
import { Text } from '../../../components/text/text';
import { SECURITY_TIME } from '../../../constants/defaults';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useRevealPrivateKey } from '../../../shelter/hooks/use-reveal-private-key.hook';
import { handleSetValueToClipboard } from '../../../utils/copy-to-clipboard.util';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './reveal-private-key.styles';
import { RevealPrivateKeyTestIDs } from './reveal-private-key.test-ids';

export const RevealPrivateKey: FC = () => {
  const {
    params: { publicKeyHash }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.RevealPrivateKey>>();

  const [isShowProtectLayout, setIsShowProtectLayout] = useState(true);
  const [privateKey, setPrivateKey] = useState('');

  const revealPrivateKey = useRevealPrivateKey();

  const getPrivateKey = () => {
    revealPrivateKey({
      publicKeyHash,
      successCallback: privateKeyParam => {
        setPrivateKey(privateKeyParam);
        setIsShowProtectLayout(false);
      }
    });
  };

  const handleCopy = () => {
    handleSetValueToClipboard(privateKey);
    setIsShowProtectLayout(true);
    setPrivateKey('');
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isShowProtectLayout) {
      timeout = setTimeout(() => {
        setIsShowProtectLayout(true);
        setPrivateKey('');
      }, SECURITY_TIME);
    }

    return () => clearTimeout(timeout);
  }, [isShowProtectLayout]);

  return (
    <ModalContainer screenTitle="Reveal Private Key" testID={RevealPrivateKeyTestIDs.ScreenTitle}>
      <ScrollView style={styles.root}>
        <Announcement text="Never share private key with third persons" style={styles.warning} />
        <Text style={styles.title}>Private Key</Text>
        <Text style={styles.description}>Here you can reveal your Private Key</Text>
        <View style={styles.wrapper}>
          {isShowProtectLayout && (
            <ProtectLayout handleHideLayout={getPrivateKey} testID={RevealPrivateKeyTestIDs.TapToRevealOverlay} />
          )}
          <Text style={styles.privateKey} testID={RevealPrivateKeyTestIDs.PrivateKeyText}>
            {privateKey}
          </Text>
          <Pressable onPress={handleCopy} style={styles.copy} testID={RevealPrivateKeyTestIDs.CopyButton}>
            <Text style={styles.copyText}>Copy</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ModalContainer>
  );
};
