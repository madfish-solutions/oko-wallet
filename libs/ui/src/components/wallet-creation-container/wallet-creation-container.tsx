import React, { FC, RefObject } from 'react';
import { ScrollView } from 'react-native';

import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import {
  FooterNavigationButtons,
  FooterButtonsInterface
} from '../footer-navigation-buttons/footer-navigation-buttons';
import { ScreenTitle } from '../screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../screen-components/header-container/header-container';
import { ScreenContainer } from '../screen-components/screen-container/screen-container';
import { Steps } from '../steps/steps';

import { styles } from './wallet-creation-container.styles';

const CREATE_WALLET_STEPS = 3;

interface Props extends Omit<FooterButtonsInterface, 'submitTitle' | 'onCancelPress'> {
  title: string;
  currentStep: number;
  submitTitle?: string;
  stepsAmount?: number;
  scrollViewRef?: RefObject<ScrollView>;
}

export const WalletCreationContainer: FC<Props> = ({
  title,
  currentStep,
  onSubmitPress,
  isSubmitDisabled,
  submitTitle = 'Next',
  stepsAmount = CREATE_WALLET_STEPS,
  scrollViewRef,
  children,
  submitButtonTestID,
  cancelButtonTestID
}) => {
  const { navigate, goBack } = useNavigation();

  const navigateToCreateANewWallet = () => goBack();
  const closeCreateWalletSteps = () => navigate(ScreensEnum.Welcome);

  return (
    <ScreenContainer>
      <HeaderContainer>
        <ScreenTitle title={title} onBackButtonPress={navigateToCreateANewWallet} titleStyle={styles.title} />
        <Steps currentStep={currentStep} stepsAmount={stepsAmount} />
      </HeaderContainer>

      <ScrollView ref={scrollViewRef} style={styles.content}>
        {children}
      </ScrollView>

      <FooterNavigationButtons
        submitTitle={submitTitle}
        onCancelPress={closeCreateWalletSteps}
        isSubmitDisabled={isSubmitDisabled}
        onSubmitPress={onSubmitPress}
        submitButtonTestID={submitButtonTestID}
        cancelButtonTestID={cancelButtonTestID}
      />
    </ScreenContainer>
  );
};
