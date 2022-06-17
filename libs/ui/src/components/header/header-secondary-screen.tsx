import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { HeaderContainer } from './header-container/header-container';
import { HeaderNavigation } from './header-navigation/header-navigation';

interface Props {
  title: string;
  style?: StyleProp<ViewStyle>;
}

export const HeaderSecondaryScreen: FC<Props> = ({ title, style }) => (
  <HeaderContainer style={style}>
    <HeaderNavigation text={title} />
  </HeaderContainer>
);
