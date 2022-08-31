import React, { FC, RefObject } from 'react';
import { ScrollView } from 'react-native';

import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { Steps } from '../../../../components/steps/steps';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { FooterButtons, FooterButtonsInterface } from '../footer-buttons/footer-buttons';

import { styles } from './container.styles';

interface Props extends Pick<FooterButtonsInterface, 'isSubmitDisabled' | 'onSubmitPress'> {
  title: string;
  step: number;
  scrollViewRef?: RefObject<ScrollView>;
}

export const Container: FC<Props> = ({ title, step, onSubmitPress, isSubmitDisabled, scrollViewRef, children }) => {
  const { navigate, goBack } = useNavigation();

  const navigateToCreateANewWallet = () => goBack();
  const closeCreateWalletSteps = () => navigate(ScreensEnum.ImportAccount);

  return (
    <ScreenContainer>
      <HeaderContainer>
        <ScreenTitle title={title} onBackButtonPress={navigateToCreateANewWallet} textStyle={styles.title} />
        <Steps currentStep={step} stepsAmount={3} />
      </HeaderContainer>

      <ScrollView ref={scrollViewRef} style={styles.content}>
        {children}
      </ScrollView>

      <FooterButtons
        submitTitle="Next"
        onCancelPress={closeCreateWalletSteps}
        isSubmitDisabled={isSubmitDisabled}
        onSubmitPress={onSubmitPress}
      />
    </ScreenContainer>
  );
};
