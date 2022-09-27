import React, { FC } from 'react';

import { ScreenTitle } from '../../../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../../../components/screen-components/screen-container/screen-container';
import { useNavigation } from '../../../../../../hooks/use-navigation.hook';

export const RevealSeedPhrase: FC = () => {
  const { goBack } = useNavigation();

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Reveal Seed Phrase" onBackButtonPress={goBack} />
      </HeaderContainer>
    </ScreenContainer>
  );
};
