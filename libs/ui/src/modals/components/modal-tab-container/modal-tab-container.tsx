import React, { FC, PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';

import { ViewStyleProps } from '../../../interfaces/style.interface';
import { TestIDProps } from '../../../interfaces/test-id.props';
import { ModalContainer } from '../modal-container/modal-container';

import { styles } from './modal-tab-container.styles';

type Props = PropsWithChildren<{
  screenTitle: string;
  style?: ViewStyleProps;
}> &
  TestIDProps;

export const ModalTabContainer: FC<Props> = ({ screenTitle, children, testID }) => (
  <ModalContainer screenTitle={screenTitle} isBackButton testID={testID}>
    <ScrollView style={styles.content} contentContainerStyle={styles.container}>
      {children}
    </ScrollView>
  </ModalContainer>
);
