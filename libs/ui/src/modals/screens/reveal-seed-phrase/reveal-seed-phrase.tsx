import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { map } from 'rxjs';

import { Announcement } from '../../../components/announcement/announcement';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { MnemonicActionButton } from '../../../components/mnemonic-action-button/mnemonic-action-button';
import { Mnemonic } from '../../../components/mnemonic/mnemonic';
import { NavigationBar } from '../../../components/navigation-bar/navigation-bar';
import { Text } from '../../../components/text/text';
import { SECURITY_TIME } from '../../../constants/defaults';
import { Shelter } from '../../../shelter/shelter';
import { handleCopyToClipboard } from '../../../utils/copy-to-clipboard.util';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './reveal-seed-phrase.styles';

// TODO: Add amountWords from settings
const initialSeedPhraseValue = [...Array(12).fill('')];

export const RevealSeedPhrase: FC = () => {
  const [isShowProtectLayout, setIsShowProtectLayout] = useState(true);
  const [seedPhrase, setSeedPhrase] = useState<string[]>(initialSeedPhraseValue);

  const getSeedPhrase = (successCallback: (arg: string) => void) =>
    Shelter.revealSeedPhrase$()
      .pipe(map(seedPhrase => seedPhrase))
      .subscribe(seedPhrase => {
        successCallback(seedPhrase);
      });

  const handleHideLayout = () => {
    getSeedPhrase(seedPhrase => {
      setSeedPhrase(seedPhrase.split(' '));
      setIsShowProtectLayout(false);
    });
  };

  const handleCopy = () => {
    const seedPhraseAlreadyExist = seedPhrase.every(word => isNotEmptyString(word));

    if (seedPhraseAlreadyExist) {
      handleCopyToClipboard(seedPhrase.join(' '));
    } else {
      getSeedPhrase(seedPhrase => {
        handleCopyToClipboard(seedPhrase);

        if (!isShowProtectLayout) {
          setIsShowProtectLayout(true);
        }

        setSeedPhrase(initialSeedPhraseValue);
      });
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isShowProtectLayout) {
      timeout = setTimeout(() => {
        setIsShowProtectLayout(true);
        setSeedPhrase(initialSeedPhraseValue);
      }, SECURITY_TIME);
    }

    return () => clearTimeout(timeout);
  }, [isShowProtectLayout]);

  return (
    <ModalContainer screenTitle="Reveal Seed phrase">
      <ScrollView style={styles.root}>
        <Announcement text="Never share seed phrase with third persons" style={styles.warning} />
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
