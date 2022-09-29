import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';

import { Dropdown } from '../../../components/dropdown/dropdown';
import { SeedWordsAmount, words } from '../../../constants/seed-words-amount';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { ModalContainer } from '../../components/modal-container/modal-container';

export const WordsAmountSelector: FC = () => {
  const { params: routeParams } = useRoute<RouteProp<ScreensParamList, ScreensEnum.WordsAmountSelector>>();
  const { navigate, goBack } = useNavigation();

  const handleSetWordsAmount = (wordsAmount: SeedWordsAmount) => {
    if (wordsAmount.value !== routeParams?.wordsAmount.value) {
      navigate(ScreensEnum.CreateANewWallet, { wordsAmount });
    } else {
      goBack();
    }
  };

  return (
    <ModalContainer screenTitle="Amount Words">
      <Dropdown
        description="Choose the length of the seed phrase (number of words)"
        options={words}
        onSelect={option => handleSetWordsAmount(option)}
        selectedId={routeParams?.wordsAmount.id}
      />
    </ModalContainer>
  );
};
