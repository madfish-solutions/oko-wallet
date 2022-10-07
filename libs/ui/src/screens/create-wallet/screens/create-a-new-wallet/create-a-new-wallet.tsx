import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import { generateMnemonic as generateMnemonicLib } from 'bip39';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Column } from '../../../../components/column/column';
import { DropdownSelectedItem } from '../../../../components/dropdown/components/dropdown-selected-item/dropdown-selected-item';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { MnemonicActionButton } from '../../../../components/mnemonic-action-button/mnemonic-action-button';
import { Mnemonic } from '../../../../components/mnemonic/mnemonic';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { SECURITY_TIME } from '../../../../constants/defaults';
import { words } from '../../../../constants/seed-words-amount';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { handleCopyToClipboard } from '../../../../utils/copy-to-clipboard.util';
import { Container } from '../../components/container/container';
import { WarningMessage } from '../../components/warning-message/warning-message';

import { styles } from './create-a-new-wallet.styles';

export const CreateANewWallet: FC = () => {
  const { params: routeParams } = useRoute<RouteProp<ScreensParamList, ScreensEnum.CreateANewWallet>>();
  const { navigate } = useNavigation();

  const wordsState = routeParams?.wordsAmount ?? words[0];

  const generateMnemonic = () => generateMnemonicLib(256).split(' ').slice(0, wordsState.value);

  const [wordsAmount, setWordsAmount] = useState(wordsState);
  const [mnemonic, setMnemonic] = useState<string[]>(generateMnemonic());
  const [isSelectedCheckbox, setIsSelectedCheckbox] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isShowProtectLayout, setIsShowProtectLayout] = useState(true);
  const [isOpenWarningDropdown, setIsOpenWarningDropdown] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (isDefined(routeParams)) {
      setWordsAmount(routeParams.wordsAmount);
      setIsError(false);
      setIsShowProtectLayout(true);
    }
  }, [routeParams]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isShowProtectLayout) {
      timeout = setTimeout(() => setIsShowProtectLayout(true), SECURITY_TIME);
    }

    return () => clearTimeout(timeout);
  }, [isShowProtectLayout, mnemonic]);

  useEffect(() => {
    setMnemonic(generateMnemonic());
    setIsSelectedCheckbox(false);
  }, [wordsState.value]);

  const navigateToVerifyMnemonic = () => {
    if (!isSelectedCheckbox) {
      setTimeout(() => {
        if (scrollViewRef?.current !== null) {
          scrollViewRef.current.scrollTo({ y: 500 });
        }
      }, 0);

      return setIsError(true);
    }

    setIsShowProtectLayout(true);
    navigate(ScreensEnum.VerifyMnemonic, { mnemonic });
  };

  const navigateToWordsAmountSelector = () => navigate(ScreensEnum.WordsAmountSelector, { wordsAmount });

  const generateNewMnemonic = () => {
    setMnemonic(generateMnemonic);
    setIsSelectedCheckbox(false);
  };

  const handleCopyMnemonic = () => {
    handleCopyToClipboard(mnemonic.join(' '));
    setIsShowProtectLayout(true);
  };

  const handleToggleCheckbox = () => {
    setIsSelectedCheckbox(!isSelectedCheckbox);
  };

  const handleHideLayout = () => {
    setIsShowProtectLayout(false);
  };

  useEffect(() => {
    setIsError(false);

    if (isSelectedCheckbox) {
      setIsShowProtectLayout(true);
    }
  }, [isSelectedCheckbox]);

  useEffect(() => {
    if (isOpenWarningDropdown) {
      setIsShowProtectLayout(true);
    }
  }, [isOpenWarningDropdown]);

  return (
    <Container
      title="Create A New Wallet"
      step={1}
      onSubmitPress={navigateToVerifyMnemonic}
      isSubmitDisabled={isError}
      scrollViewRef={scrollViewRef}
    >
      <WarningMessage checkIsOpenDropdownState={setIsOpenWarningDropdown} style={styles.warning} />

      <Row style={styles.wordsAmount}>
        <Text style={styles.amountWordsText}>Amount Words</Text>

        <DropdownSelectedItem title={wordsAmount.value.toString()} onPress={navigateToWordsAmountSelector} />
      </Row>

      <Mnemonic mnemonic={mnemonic} isShowProtectLayout={isShowProtectLayout} handleHideLayout={handleHideLayout}>
        <MnemonicActionButton
          onPress={generateNewMnemonic}
          iconName={IconNameEnum.Refresh}
          text="Generate New"
          style={styles.marginRight}
        />
        <MnemonicActionButton onPress={handleCopyMnemonic} iconName={IconNameEnum.Copy} text="Copy" />
      </Mnemonic>

      <Column style={styles.confirmation}>
        <Pressable onPress={handleToggleCheckbox} style={styles.confirmationWrapper}>
          {isSelectedCheckbox ? (
            <Icon name={IconNameEnum.SelectedSquareCheckbox} iconStyle={styles.checkbox} />
          ) : (
            <Icon name={IconNameEnum.EmptySquareCheckbox} iconStyle={styles.checkbox} />
          )}
          <Text style={styles.confirmationText}>I saved my mnemonic</Text>
        </Pressable>

        {isError && (
          <Text style={styles.error}>To continue, you need to confirm that you have saved your mnemonic</Text>
        )}
      </Column>
    </Container>
  );
};
