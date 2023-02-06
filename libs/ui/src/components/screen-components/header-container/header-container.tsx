import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';

import { ViewStyleProps } from '../../../interfaces/style.interface';
import { Row } from '../../row/row';

import { HeaderSelectors } from './components/header-selectors/header-selectors';
import { styles } from './header-container.styles';

type Props = PropsWithChildren<{
  isSelectors?: boolean;
  style?: ViewStyleProps;
}>;

export const HeaderContainer: FC<Props> = ({ style, children, isSelectors = false }) => (
  <View style={[styles.root, !isSelectors && styles.paddingTop, style]}>
    {isSelectors && <HeaderSelectors />}

    <Row style={styles.children}>{children}</Row>
  </View>
);
