import { useRoute } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Column } from '../../components/column/column';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Paste } from '../../components/paste/paste';
import { Row } from '../../components/row/row';
import { Text } from '../../components/text/text';
import { WalletCreationContainer } from '../../components/wallet-creation-container/wallet-creation-container';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useImportSeedPhrase } from '../../hooks/use-import-seed-phrase.hook';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { getCustomSize } from '../../styles/format-size';

import { styles } from './import-wallet.styles';
import { ImportWalletTestIDs } from './import-wallet.test-ids';

export const ImportWallet: FC = () => {
  const { params: routeParams } = useRoute<RouteProp<ScreensParamList, ScreensEnum.ImportWallet>>();
  const { navigate } = useNavigation();

  const {
    mnemonic,
    isEmptyFieldsExist,
    error,
    scrollViewRef,
    wordsAmount,
    selectedInputIndex,
    isShowProtectLayout,
    isSubmitted,
    checkErrors,
    navigateToWordsAmountSelector,
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    handleShowLayout,
    handlePasteMnemonicFromClipboard,
    setIsSubmitted
  } = useImportSeedPhrase(routeParams?.wordsAmount);

  const navigateToAlmostDoneScreen = () => {
    setIsSubmitted(true);

    const isError = checkErrors();

    if (!isError) {
      navigate(ScreensEnum.AlmostDone, {
        mnemonic: mnemonic.filter(word => isNotEmptyString(word)).join(' '),
        currentStep: 2,
        stepsAmount: 2
      });
    }
  };

  return (
    <WalletCreationContainer
      title="Import Existing Wallet"
      currentStep={1}
      stepsAmount={2}
      onSubmitPress={navigateToAlmostDoneScreen}
      isSubmitDisabled={(isEmptyFieldsExist && isSubmitted) || !!error}
      scrollViewRef={scrollViewRef}
      submitButtonTestID={ImportWalletTestIDs.NextButton}
    >
      <Row style={styles.wordsAmount}>
        <Text style={styles.amountWordsText}>Mnemonic Length</Text>

        <Pressable onPress={navigateToWordsAmountSelector}>
          <Row style={styles.wordsSelector}>
            <Text style={styles.amountWords}>{wordsAmount}</Text>
            <Icon name={IconNameEnum.Dropdown} size={getCustomSize(2)} />
          </Row>
        </Pressable>
      </Row>

      <Column style={styles.mnemonicContainer}>
        <Row style={styles.wordsWrapper}>
          <Row style={[styles.wordsColumn, styles.marginRight]}>
            {mnemonic.slice(0, wordsAmount).map((word, index) => {
              const value = word;
              const isSelectedInput = index === selectedInputIndex;

              return (
                <View key={index} style={styles.inputContainer}>
                  <TextInput
                    ref={el => (index === selectedInputIndex ? el?.focus() : null)}
                    value={value}
                    style={[styles.mnemonicInput, isSubmitted && !isNotEmptyString(value) && styles.error]}
                    onBlur={handleInputBlur}
                    onFocus={el => handleInputFocus(index, el)}
                    onChangeText={newValue => handleInputChange(newValue, index)}
                    testID={ImportWalletTestIDs.WordInput}
                  />
                  <Text selectable={false} style={styles.wordIndex}>{`${index + 1}.`}</Text>
                  {isNotEmptyString(value) && isShowProtectLayout && !isSelectedInput && (
                    <Pressable onPress={() => handleShowLayout(index)} style={styles.layout}>
                      <Text style={styles.layoutText}>Tap to reveal</Text>
                    </Pressable>
                  )}
                </View>
              );
            })}
          </Row>
        </Row>

        <Row style={styles.buttons}>
          <Paste handlePaste={handlePasteMnemonicFromClipboard} />
        </Row>
      </Column>

      {isNotEmptyString(error) && <Text style={styles.errorText}>{error}</Text>}
    </WalletCreationContainer>
  );
};
