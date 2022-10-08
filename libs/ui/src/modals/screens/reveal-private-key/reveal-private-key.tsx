import React, { FC, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { Announcement } from '../../../components/announcement/announcement';
import { NavigationBar } from '../../../components/navigation-bar/navigation-bar';
import { Pressable } from '../../../components/pressable/pressable';
import { ProtectLayout } from '../../../components/protect-layout/protect-layout';
import { Text } from '../../../components/text/text';
import { SECURITY_TIME } from '../../../constants/defaults';
import { useShelter } from '../../../hooks/use-shelter.hook';
import { useSelectedAccountPublicKeyHashSelector } from '../../../store/wallet/wallet.selectors';
import { handleCopyToClipboard } from '../../../utils/copy-to-clipboard.util';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './reveal-private-key.styles';

export const RevealPrivateKey: FC = () => {
  const [isShowProtectLayout, setIsShowProtectLayout] = useState(true);
  const [privateKey, setPrivateKey] = useState('');
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { revealPrivateKey } = useShelter();

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
    handleCopyToClipboard(privateKey);
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
    <ModalContainer screenTitle="Reveal Private Key">
      <ScrollView style={styles.root}>
        <Announcement text="Never share private key with third persons" style={styles.warning} />
        <Text style={styles.title}>Private Key</Text>
        <Text style={styles.description}>Here you can reveal your Private Key</Text>
        <View style={styles.wrapper}>
          {isShowProtectLayout && <ProtectLayout handleHideLayout={getPrivateKey} />}
          <Text style={styles.privateKey}>{privateKey}</Text>
          <Pressable onPress={handleCopy} style={styles.copy}>
            <Text style={styles.copyText}>Copy</Text>
          </Pressable>
        </View>
      </ScrollView>
      <NavigationBar />
    </ModalContainer>
  );
};
