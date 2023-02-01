import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';

import { Tabs } from '../../../components/tabs/tabs';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { ModalTabContainer } from '../../components/modal-tab-container/modal-tab-container';

import { styles } from './add-account.styles';
import { AddAccountTestIDs } from './add-account.test-ids';
import { CreateHD } from './components/create-hd/create-hd';
import { PrivateKey } from './components/private-key/private-key';
import { SeedPhrase } from './components/seed-phrase/seed-phrase';

const tabs = [
  {
    id: 1,
    title: 'Create HD',
    Component: CreateHD
  },
  {
    id: 2,
    title: 'Private Key',
    Component: PrivateKey
  },
  {
    id: 3,
    title: 'Seed Phrase',
    Component: SeedPhrase
  }
];

export const AddAccount: FC = () => {
  const { params: routeParams } = useRoute<RouteProp<ScreensParamList, ScreensEnum.AddAccount>>();
  const { navigate } = useNavigation();

  const setParams = (id: number) => navigate(ScreensEnum.AddAccount, { activeId: id });

  return (
    <ModalTabContainer screenTitle="Add new account" testID={AddAccountTestIDs.AddNewAccountTitle}>
      <Tabs values={tabs} activeItemId={routeParams?.activeId} activeItemCallback={setParams} tabsStyle={styles.tabs} />
    </ModalTabContainer>
  );
};
