import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';

import { Dropdown } from '../../../components/dropdown/dropdown';
import { SeedWordsAmount, words } from '../../../constants/seed-words-amount';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { usePreviousScreenName } from '../../../hooks/use-previous-screen-name.hook';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { WordsAmountSelectorTestIDs } from './words-amount-selector.test-ids';

export const WordsAmountSelector: FC = () => {
  const { params: routeParams } = useRoute<RouteProp<ScreensParamList, ScreensEnum.WordsAmountSelector>>();
  const { navigate, goBack } = useNavigation();
  const previousScreen = usePreviousScreenName();

  const handleSetWordsAmount = (wordsAmount: SeedWordsAmount) => {
    if (wordsAmount.value !== routeParams?.wordsAmount.value) {
      if (
        previousScreen === ScreensEnum.ImportWallet ||
        previousScreen === ScreensEnum.CreateANewWallet ||
        previousScreen === ScreensEnum.AddAccount
      ) {
        navigate(previousScreen, { wordsAmount });
      }
    } else {
      goBack();
    }
  };

  return (
    <ModalContainer screenTitle="Amount Words">
      <Dropdown
        description="Choose the length of the seed phrase (number of words)"
        options={words}
        onSelect={handleSetWordsAmount}
        selectedId={routeParams?.wordsAmount.id}
        testID={WordsAmountSelectorTestIDs.CancelButton}
      />
    </ModalContainer>
  );
};
