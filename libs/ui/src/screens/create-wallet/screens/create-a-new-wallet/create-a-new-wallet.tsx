import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import { generateMnemonic as generateMnemonicLib } from 'bip39';
import React, { FC, useEffect, useState } from 'react';
import { Pressable } from 'react-native';

import { Column } from '../../../../components/column/column';
import { DropdownSelectedItem } from '../../../../components/dropdown/components/dropdown-selected-item/dropdown-selected-item';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Mnemonic } from '../../../../components/mnemonic/mnemonic';
import { MnemonicActionButton } from '../../../../components/mnemonic-action-button/mnemonic-action-button';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { WalletCreationContainer } from '../../../../components/wallet-creation-container/wallet-creation-container';
import { SECURITY_TIME } from '../../../../constants/defaults';
import { MnemonicLengthEnum, words } from '../../../../constants/seed-words-amount';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useScrollToOffset } from '../../../../hooks/use-scroll-to-element.hook';
import { handleSetValueToClipboard } from '../../../../utils/copy-to-clipboard.util';
import { WarningMessageDropdown } from '../../components/warning-message-dropdown/warning-message-dropdown';

import { styles } from './create-a-new-wallet.styles';
import { CreateANewWalletTestIDs } from './create-a-new-wallet.test-ids';

export const CreateANewWallet: FC = () => {
  const { params: routeParams } = useRoute<RouteProp<ScreensParamList, ScreensEnum.CreateANewWallet>>();
  const { navigate } = useNavigation();
  const { scrollViewRef, scrollToOffset } = useScrollToOffset();

  const wordsState = routeParams?.wordsAmount ?? words[0];

  const generateMnemonic = () => {
    switch (wordsState.value) {
      case MnemonicLengthEnum.Twelve:
        return generateMnemonicLib(128).split(' ');
      case MnemonicLengthEnum.Fifteen:
        return generateMnemonicLib(160).split(' ');
      case MnemonicLengthEnum.Eighteen:
        return generateMnemonicLib(192).split(' ');
      case MnemonicLengthEnum.TwentyOne:
        return generateMnemonicLib(224).split(' ');
      default:
        return generateMnemonicLib(256).split(' ');
    }
  };

  const [wordsAmount, setWordsAmount] = useState(wordsState);
  const [mnemonic, setMnemonic] = useState<string[]>(generateMnemonic());
  const [isSelectedCheckbox, setIsSelectedCheckbox] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isShowProtectLayout, setIsShowProtectLayout] = useState(true);
  const [isOpenWarningDropdown, setIsOpenWarningDropdown] = useState(false);

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
      scrollToOffset();

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
    handleSetValueToClipboard(mnemonic.join(' '));
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
    <WalletCreationContainer
      title="Create A New Wallet"
      currentStep={1}
      onSubmitPress={navigateToVerifyMnemonic}
      isSubmitDisabled={isError}
      scrollViewRef={scrollViewRef}
      submitButtonTestID={CreateANewWalletTestIDs.NextButton}
    >
      <WarningMessageDropdown
        checkIsOpenDropdownState={setIsOpenWarningDropdown}
        style={styles.warning}
        testID={CreateANewWalletTestIDs.WarningMessageDropdown}
      />

      <Row style={styles.wordsAmount}>
        <Text style={styles.amountWordsText}>Mnemonic Length</Text>

        <DropdownSelectedItem
          title={wordsAmount.value.toString()}
          onPress={navigateToWordsAmountSelector}
          testID={CreateANewWalletTestIDs.WordsAmountDropdown}
        />
      </Row>

      <Mnemonic
        mnemonic={mnemonic}
        isShowProtectLayout={isShowProtectLayout}
        handleHideLayout={handleHideLayout}
        protectLayoutTestID={CreateANewWalletTestIDs.TapToRevealLayout}
        wordTextTestID={CreateANewWalletTestIDs.MnemonicWordText}
      >
        <MnemonicActionButton
          onPress={generateNewMnemonic}
          iconName={IconNameEnum.Refresh}
          text="Generate New"
          style={styles.marginRight}
          testID={CreateANewWalletTestIDs.GenerateNewMnemonic}
        />
        <MnemonicActionButton
          onPress={handleCopyMnemonic}
          iconName={IconNameEnum.Copy}
          text="Copy"
          testID={CreateANewWalletTestIDs.CopySeedButton}
        />
      </Mnemonic>

      <Column style={styles.confirmation}>
        <Pressable
          onPress={handleToggleCheckbox}
          style={styles.confirmationWrapper}
          testID={CreateANewWalletTestIDs.MnemonicSavedCheckbox}
        >
          {isSelectedCheckbox ? (
            <Icon name={IconNameEnum.SelectedSquareCheckboxSmall} iconStyle={styles.checkbox} />
          ) : (
            <Icon name={IconNameEnum.EmptySquareCheckboxSmall} iconStyle={styles.checkbox} />
          )}
          <Text style={styles.confirmationText}>I saved my mnemonic</Text>
        </Pressable>

        {isError && (
          <Text style={styles.error} testID={CreateANewWalletTestIDs.SavedSeedError}>
            To continue, you need to confirm that you have saved your mnemonic
          </Text>
        )}
      </Column>
    </WalletCreationContainer>
  );
};
