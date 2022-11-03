import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { ViewStyleProps } from '../../../interfaces/style.interface';
import { ModalContainer } from '../modal-container/modal-container';

import { styles } from './modal-tab-container.styles';

interface Props {
  screenTitle: string;
  style?: ViewStyleProps;
}

export const ModalTabContainer: FC<Props> = ({ screenTitle, children }) => (
  <ModalContainer screenTitle={screenTitle} isBackButton>
    <ScrollView style={styles.content} contentContainerStyle={styles.container}>
      {children}
    </ScrollView>
  </ModalContainer>
);
