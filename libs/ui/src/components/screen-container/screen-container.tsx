import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';

import { useUnlock } from '../../hooks/use-unlock.hook';
import { Column } from '../column/column';
import { HeaderMainScreen } from '../header/header-main-screen';
import { HeaderSecondaryScreen } from '../header/header-secondary-screen';
import { HeaderSideTypeEnum } from '../header/header-side-type.enum';
import { HeaderIconsProps } from '../header/header.interface';
import { NavigationBar } from '../navigation-bar/navigation-bar';

import { styles } from './screen-container.styles';

interface Props extends HeaderIconsProps {
  screenTitle?: string;
  navigationType?: HeaderSideTypeEnum;
  style?: StyleProp<ViewStyle>;
}

export const ScreenContainer: FC<Props> = ({ screenTitle, icons, navigationType, style, children }) => {
  const { isLocked } = useUnlock();

  return (
    <Column style={[styles.root, style]}>
      {isDefined(screenTitle) ? (
        <HeaderSecondaryScreen title={screenTitle} icons={icons} navigationType={navigationType} />
      ) : (
        <HeaderMainScreen />
      )}

      <ScrollView scrollEnabled={!isLocked}>
        <View style={styles.content}>{children}</View>
      </ScrollView>

      <NavigationBar />
    </Column>
  );
};
