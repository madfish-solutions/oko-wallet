import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { Pressable, View } from 'react-native';

import { Button } from '../../../components/button/button';
import { ButtonSizeEnum, ButtonThemesEnum } from '../../../components/button/enums';
import { Column } from '../../../components/column/column';
import { Icon } from '../../../components/icon/icon';
import { IconNameEnum } from '../../../components/icon/icon-name.enum';
import { Text } from '../../../components/text/text';
import { SeedWordsAmount, words } from '../../../constants/seed-words-amount';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './words-amount-selector.styles';

export const WordsAmountSelector: FC = () => {
  const { params: routeParams } = useRoute<RouteProp<ScreensParamList, ScreensEnum.WordsAmountSelector>>();
  const { navigate, goBack, getState } = useNavigation();

  const handleSetWordsAmount = (wordsAmount: SeedWordsAmount) => {
    const { routes } = getState();

    const parentRoute = routes[routes.length - 2];

    if (wordsAmount.value !== routeParams?.wordsAmount.value) {
      navigate(parentRoute.name, { wordsAmount });
    } else {
      goBack();
    }
  };

  const handleCloseWordsAmountSelector = () => goBack();

  return (
    <ModalContainer screenTitle="Amount Words">
      <Column style={styles.container}>
        <Text style={styles.description}>Choose the length of the seed phrase (number of words)</Text>

        <Column style={styles.wrapper}>
          {words.map(({ id, title, value }) => (
            <Pressable key={id} onPress={() => handleSetWordsAmount({ id, title, value })} style={styles.item}>
              <Text style={styles.title}>{title}</Text>
              {(routeParams?.wordsAmount.id ?? words[1].id) === id ? (
                <Icon name={IconNameEnum.SelectedCheckbox} />
              ) : (
                <Icon name={IconNameEnum.EmptyCheckbox} />
              )}
            </Pressable>
          ))}
        </Column>
      </Column>

      <View style={styles.footer}>
        <Button
          title="Cancel"
          theme={ButtonThemesEnum.Primary}
          size={ButtonSizeEnum.Large}
          onPress={handleCloseWordsAmountSelector}
        />
      </View>
    </ModalContainer>
  );
};
