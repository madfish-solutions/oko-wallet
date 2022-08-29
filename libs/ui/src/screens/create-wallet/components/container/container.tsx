import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { Row } from '../../../../components/row/row';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { Text } from '../../../../components/text/text';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { FooterButtons, FooterButtonsInterface } from '../footer-buttons/footer-buttons';

import { styles } from './container.styles';

interface Props extends Pick<FooterButtonsInterface, 'isSubmitDisabled' | 'onSubmitPress'> {
  title: string;
  step: number;
}

export const Container: FC<Props> = ({ title, step, onSubmitPress, isSubmitDisabled, children }) => {
  const { navigate } = useNavigation();

  const navigateToStart = () => navigate(ScreensEnum.ImportAccount);

  return (
    <ScreenContainer>
      <HeaderContainer>
        <ScreenTitle title={title} onBackButtonPress={navigateToStart} textStyle={styles.title} />
        <Row>
          <Text>{`Step ${step}/3`}</Text>
        </Row>
      </HeaderContainer>

      <ScrollView style={styles.root}>{children}</ScrollView>

      <FooterButtons
        submitTitle="Next"
        onCancelPress={navigateToStart}
        isSubmitDisabled={isSubmitDisabled}
        onSubmitPress={onSubmitPress}
      />
    </ScreenContainer>
  );
};
