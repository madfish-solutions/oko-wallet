import React, { FC } from 'react';

import { NavigationBar } from '../../../../components/navigation-bar/navigation-bar';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { Tabs } from '../../../../components/tabs/tabs';
import { useNavigation } from '../../../../hooks/use-navigation.hook';

import { HdAccounts } from './copmonents/hd-accounts/hd-accounts';
import { ImportedAccounts } from './copmonents/imported-accounts/imported-accounts';

const tabs = [
  {
    id: 1,
    title: 'HD',
    Component: HdAccounts
  },
  {
    id: 2,
    title: 'Imported',
    Component: ImportedAccounts
  }
];

export const AccountsSettings: FC = () => {
  const { goBack } = useNavigation();

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Accounts Settings" onBackButtonPress={goBack} />
      </HeaderContainer>

      <Tabs values={tabs} />

      <NavigationBar />
    </ScreenContainer>
  );
};
