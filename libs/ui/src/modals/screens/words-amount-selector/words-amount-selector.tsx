import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';

import { Dropdown } from '../../../components/dropdown/dropdown';
import { SeedWordsAmount, words } from '../../../constants/seed-words-amount';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { ModalContainer } from '../../components/modal-container/modal-container';

export const WordsAmountSelector: FC = () => {
  const { params: routeParams } = useRoute<RouteProp<ScreensParamList, ScreensEnum.WordsAmountSelector>>();
  const { navigate, goBack, getState } = useNavigation();

  const handleSetWordsAmount = (wordsAmount: SeedWordsAmount) => {
    const { routes } = getState();

    const parentRoute = routes[routes.length - 2];

    if (wordsAmount.value !== routeParams?.wordsAmount.value) {
      if (parentRoute.name === ScreensEnum.ImportWallet || parentRoute.name === ScreensEnum.CreateANewWallet) {
        navigate(parentRoute.name, { wordsAmount });
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
      />
    </ModalContainer>
  );
};
