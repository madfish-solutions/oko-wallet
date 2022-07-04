import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { ScrollView, ScrollViewProps, StyleProp, ViewStyle } from 'react-native';

import { Column } from '../column/column';
import { HeaderMainScreen } from '../header/header-main-screen';
import { HeaderSecondaryScreen } from '../header/header-secondary-screen';
import { HeaderSideTypeEnum } from '../header/header-side-type.enum';
import { Icons } from '../header/header.interface';
import { NavigationBar } from '../navigation-bar/navigation-bar';

import { styles } from './screen-container.styles';

interface Props extends ScrollViewProps, Icons {
  screenTitle?: string;
  navigationType?: HeaderSideTypeEnum;
  style?: StyleProp<ViewStyle>;
}

export const ScreenContainer: FC<Props> = ({
  screenTitle,
  icons,
  navigationType,
  style,
  children,
  ...scrollViewProps
}) => (
  <Column style={[styles.root, style]}>
    {!isDefined(screenTitle) ? (
      <HeaderMainScreen />
    ) : (
      <HeaderSecondaryScreen title={screenTitle} icons={icons} navigationType={navigationType} />
    )}

    <ScrollView {...scrollViewProps} style={styles.content}>
      {children}
    </ScrollView>

    <NavigationBar />
  </Column>
);
