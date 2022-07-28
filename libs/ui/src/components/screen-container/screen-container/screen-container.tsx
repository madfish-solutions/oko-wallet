import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { useUnlock } from '../../../hooks/use-unlock.hook';
import { ViewStyleProps } from '../../../interfaces/style.interface';
import { Column } from '../../column/column';
import { HeaderSideTypeEnum } from '../../header/enums/header-side-type.enum';
import { HeaderSecondaryScreen } from '../../header/header-secondary-screen/header-secondary-screen';
import { HeaderIconsProps } from '../../header/interfaces/header.interface';
import { NavigationBar } from '../../navigation-bar/navigation-bar';

import { styles } from './screen-container.styles';

interface Props extends HeaderIconsProps {
  screenTitle: string;
  navigationType?: HeaderSideTypeEnum;
  style?: ViewStyleProps;
  contentStyles?: ViewStyleProps;
}

export const ScreenContainer: FC<Props> = ({ screenTitle, icons, navigationType, style, contentStyles, children }) => {
  const { isLocked } = useUnlock();

  return (
    <Column style={[styles.root, style]}>
      <HeaderSecondaryScreen title={screenTitle} icons={icons} navigationType={navigationType} />

      <ScrollView scrollEventThrottle={10} scrollEnabled={!isLocked}>
        <View style={[styles.content, contentStyles]}>{children}</View>
      </ScrollView>

      <NavigationBar />
    </Column>
  );
};
