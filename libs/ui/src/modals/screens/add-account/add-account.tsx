import React, { FC } from 'react';

import { Tabs } from '../../../components/tabs/tabs';
import { ModalTabContainer } from '../../components/modal-tab-container/modal-tab-container';

import { styles } from './add-account.styles';
import { CreateNew } from './components/create-new/create-new';
import { PrivateKey } from './components/private-key/private-key';
import { SeedPhrase } from './components/seed-phrase/seed-phrase';

const tabs = [
  {
    id: 1,
    title: 'Create New',
    Component: CreateNew
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

export const AddAccount: FC = () => (
  <ModalTabContainer screenTitle="Add new account">
    <Tabs values={tabs} tabsStyle={styles.tabs} />
  </ModalTabContainer>
);
