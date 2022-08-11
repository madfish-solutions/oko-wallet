import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { useUnlock } from '../../../hooks/use-unlock.hook';
import { ViewStyleProps } from '../../../interfaces/style.interface';
import { HeaderSideTypeEnum } from '../../header/enums/header-side-type.enum';
import { HeaderSecondaryScreen } from '../../header/header-secondary-screen/header-secondary-screen';
import { HeaderIconsProps } from '../../header/interfaces/header.interface';
import { NavigationBar } from '../../navigation-bar/navigation-bar';
import { BaseScreenColumn } from '../components/base-screen-column/base-screen-column';

import { styles } from './secondary-screen-container.styles';

interface Props extends HeaderIconsProps {
  screenTitle: string;
  navigationType?: HeaderSideTypeEnum;
  style?: ViewStyleProps;
  contentStyles?: ViewStyleProps;
  scrollViewWrapper?: boolean;
}

export const SecondaryScreenContainer: FC<Props> = ({
  screenTitle,
  icons,
  navigationType,
  style,
  contentStyles,
  children,
  scrollViewWrapper = true
}) => {
  const { isLocked } = useUnlock();

  return (
    <BaseScreenColumn style={style}>
      <HeaderSecondaryScreen title={screenTitle} icons={icons} navigationType={navigationType} />

      {scrollViewWrapper ? (
        <ScrollView scrollEventThrottle={10} scrollEnabled={!isLocked}>
          <View style={[styles.content, contentStyles]}>{children}</View>
        </ScrollView>
      ) : (
        children
      )}

      <NavigationBar />
    </BaseScreenColumn>
  );
};
