import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { HeaderContainer } from './header-container/header-container';
import { HeaderNavigation, NavigationTypeEnum } from './header-navigation/header-navigation';

interface Props {
  title: string;
  navigationType?: NavigationTypeEnum;
  style?: StyleProp<ViewStyle>;
}

export const HeaderSecondaryScreen: FC<Props> = ({ title, navigationType, style }) => (
  <HeaderContainer style={style}>
    <HeaderNavigation title={title} type={navigationType} />
  </HeaderContainer>
);
