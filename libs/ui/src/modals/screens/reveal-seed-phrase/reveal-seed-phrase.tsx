import React, { FC, useState } from 'react';
import { ScrollView } from 'react-native';
import { map } from 'rxjs';

import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { MnemonicActionButton } from '../../../components/mnemonic-action-button/mnemonic-action-button';
import { Mnemonic } from '../../../components/mnemonic/mnemonic';
import { NavigationBar } from '../../../components/navigation-bar/navigation-bar';
import { Text } from '../../../components/text/text';
import { Warning } from '../../../components/warning/warning';
import { Shelter } from '../../../shelter/shelter';
import { handleCopyToClipboard } from '../../../utils/copy-to-clipboard.util';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './reveal-seed-phrase.styles';

export const RevealSeedPhrase: FC = () => {
  const [isShowProtectLayout, setIsShowProtectLayout] = useState(true);
  const [seedPhrase, setSeedPhrase] = useState<string[]>([...Array(12).fill('')]);

  const handleHideLayout = () => {
    Shelter.revealSeedPhrase$()
      .pipe(map(seed => seed.split(' ')))
      .subscribe(seedPhrase => {
        setSeedPhrase(seedPhrase);
        setIsShowProtectLayout(false);
      });
  };

  const handleCopy = () => handleCopyToClipboard(seedPhrase.join(' '));

  return (
    <ModalContainer screenTitle="Reveal Seed phrase">
      <ScrollView style={styles.root}>
        <Warning text="Never share seed phrase with third persons" style={styles.warning} />
        <Text style={styles.title}>Seed Phrase</Text>
        <Text style={styles.description}>Here you can reveal your Seed Phrase</Text>
        <Mnemonic mnemonic={seedPhrase} isShowProtectLayout={isShowProtectLayout} handleHideLayout={handleHideLayout}>
          <MnemonicActionButton onPress={handleCopy} iconName={IconNameEnum.Copy} text="Copy" />
        </Mnemonic>
      </ScrollView>
      <NavigationBar />
    </ModalContainer>
  );
};
