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
  scrollViewWrapper?: boolean;
}

export const ScreenContainer: FC<Props> = ({
  screenTitle,
  icons,
  navigationType,
  style,
  children,
  scrollViewWrapper = true
}) => {
  const { isLocked } = useUnlock();

  return (
    <Column style={[styles.root, style]}>
      <HeaderSecondaryScreen title={screenTitle} icons={icons} navigationType={navigationType} />

      {scrollViewWrapper ? (
        <ScrollView scrollEventThrottle={10} scrollEnabled={!isLocked}>
          <View style={styles.content}>{children}</View>
        </ScrollView>
      ) : (
        children
      )}

      <NavigationBar />
    </Column>
  );
};
