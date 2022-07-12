import { isDefined } from '@rnw-community/shared';
import React, { FC, useRef } from 'react';
import { Animated, View } from 'react-native';

import { useUnlock } from '../../hooks/use-unlock.hook';
import { ViewStyleProps } from '../../interfaces/style.interface';
import { Column } from '../column/column';
import { HeaderSideTypeEnum } from '../header/enums/header-side-type.enum';
import { HeaderMainScreen } from '../header/header-main-screen/header-main-screen';
import { HeaderSecondaryScreen } from '../header/header-secondary-screen/header-secondary-screen';
import { HeaderIconsProps } from '../header/interfaces/header.interface';
import { NavigationBar } from '../navigation-bar/navigation-bar';

import { styles } from './screen-container.styles';

interface Props extends HeaderIconsProps {
  screenTitle?: string;
  navigationType?: HeaderSideTypeEnum;
  style?: ViewStyleProps;
}

export const ScreenContainer: FC<Props> = ({ screenTitle, icons, navigationType, style, children }) => {
  const { isLocked } = useUnlock();

  const scrolling = useRef(new Animated.Value(0)).current;

  return (
    <Column style={[styles.root, style]}>
      {isDefined(screenTitle) ? (
        <HeaderSecondaryScreen title={screenTitle} icons={icons} navigationType={navigationType} />
      ) : (
        <HeaderMainScreen scrolling={scrolling} />
      )}

      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrolling
                }
              }
            }
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={1}
        scrollEnabled={!isLocked}
      >
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>

      <NavigationBar />
    </Column>
  );
};
