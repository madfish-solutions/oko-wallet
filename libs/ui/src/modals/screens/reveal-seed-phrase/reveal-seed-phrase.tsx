import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { Announcement } from '../../../components/announcement/announcement';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Mnemonic } from '../../../components/mnemonic/mnemonic';
import { MnemonicActionButton } from '../../../components/mnemonic-action-button/mnemonic-action-button';
import { NavigationBar } from '../../../components/navigation-bar/navigation-bar';
import { Text } from '../../../components/text/text';
import { SECURITY_TIME } from '../../../constants/defaults';
import { useRevealSeedPhrase } from '../../../shelter/hooks/use-reveal-seed-phrase.hook';
import { handleSetValueToClipboard } from '../../../utils/copy-to-clipboard.util';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './reveal-seed-phrase.styles';
import { RevealSeedPhrasePageTestIDs } from './reveal-seed-phrase.test-ids';

// TODO: Add amountWords from settings
const initialSeedPhraseValue = [...Array(12).fill('')];

export const RevealSeedPhrase: FC = () => {
  const [isShowProtectLayout, setIsShowProtectLayout] = useState(true);
  const [seedPhrase, setSeedPhrase] = useState<string[]>(initialSeedPhraseValue);

  const revealSeedPhrase = useRevealSeedPhrase();

  const handleHideLayout = () => {
    revealSeedPhrase({
      successCallback: seedPhraseParam => {
        setSeedPhrase(seedPhraseParam.split(' '));
        setIsShowProtectLayout(false);
      }
    });
  };

  const handleCopy = () => {
    const seedPhraseAlreadyExist = seedPhrase.every(word => isNotEmptyString(word));

    if (seedPhraseAlreadyExist) {
      handleSetValueToClipboard(seedPhrase.join(' '));
      setSeedPhrase(initialSeedPhraseValue);
    } else {
      revealSeedPhrase({
        successCallback: seedPhraseParam => {
          handleSetValueToClipboard(seedPhraseParam);
        }
      });
    }

    setIsShowProtectLayout(true);
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
        <Mnemonic
          mnemonic={seedPhrase}
          isShowProtectLayout={isShowProtectLayout}
          handleHideLayout={handleHideLayout}
          protectLayoutTestID={RevealSeedPhrasePageTestIDs.TapToRevealLayoutInSettings}
          wordTextTestID={RevealSeedPhrasePageTestIDs.MnemonicWordsTextInSettings}
        >
          <MnemonicActionButton onPress={handleCopy} iconName={IconNameEnum.Copy} text="Copy" />
        </Mnemonic>
      </ScrollView>
      <NavigationBar />
    </ModalContainer>
  );
};
