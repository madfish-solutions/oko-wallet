import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { useUnlock } from '../../hooks/use-unlock.hook';
import { ViewStyleProps } from '../../interfaces/style.interface';
import { Column } from '../column/column';
import { HeaderQRCode } from '../header/components/header-qr-code/header-qr-code';
import { HeaderSideTypeEnum } from '../header/enums/header-side-type.enum';
import { HeaderMainScreen } from '../header/header-main-screen/header-main-screen';
import { HeaderSecondaryScreen } from '../header/header-secondary-screen/header-secondary-screen';
import { HeaderIconsProps } from '../header/interfaces/header.interface';
import { NavigationBar } from '../navigation-bar/navigation-bar';

import { useHeaderAnimation } from './hooks/use-header-animation.hook';
import { styles } from './screen-container.styles';

interface Props extends HeaderIconsProps {
  screenTitle?: string;
  navigationType?: HeaderSideTypeEnum;
  style?: ViewStyleProps;
}

export const ScreenContainer: FC<Props> = ({ screenTitle, icons, navigationType, style, children }) => {
  const { isLocked } = useUnlock();

  const { onScroll, onTouchEnd, qrCodeAnimation, contentOffsetY, scrollViewRef } = useHeaderAnimation();

  const isMainScreen = !isDefined(screenTitle);

  return (
    <Column style={[styles.root, style]}>
      {isDefined(screenTitle) ? (
        <HeaderSecondaryScreen title={screenTitle} icons={icons} navigationType={navigationType} />
      ) : (
        <HeaderMainScreen qrCodeVisibility={qrCodeAnimation} />
      )}

      <ScrollView
        ref={scrollViewRef}
        onTouchEnd={onTouchEnd}
        onScroll={onScroll}
        scrollEventThrottle={10}
        scrollEnabled={!isLocked}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {isMainScreen && (
          <View style={styles.qrCodeWrapper}>
            <View style={styles.layout} />
            <HeaderQRCode contentOffsetY={contentOffsetY} />
          </View>
        )}
        <View style={styles.content}>{children}</View>
      </ScrollView>

      <NavigationBar />
    </Column>
  );
};
