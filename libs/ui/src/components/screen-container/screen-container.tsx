import { isDefined } from '@rnw-community/shared';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, View, ScrollView } from 'react-native';

import { useUnlock } from '../../hooks/use-unlock.hook';
import { ViewStyleProps } from '../../interfaces/style.interface';
import { isWeb } from '../../utils/platform.utils';
import { Column } from '../column/column';
import { HeaderQRCode } from '../header/components/header-qr-code/header-qr-code';
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

  const [contentOffsetY, setContentOffsetY] = useState(isWeb ? 160 : 0);

  const scrollViewRef = useRef<ScrollView>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    setContentOffsetY(offsetY);
  };

  // TODO: Update initial value logic
  useEffect(() => {
    if (isWeb) {
      hideQrCode();
    } else {
      showQrCode();
    }
  }, []);

  const onTouchEnd = () => {
    // bring the element to the extreme points
    if (contentOffsetY > 70 && contentOffsetY < 160) {
      hideQrCode();
    } else if (contentOffsetY <= 85 && contentOffsetY > 0) {
      showQrCode();
    }
  };

  const switchQrCodeVisibility = () => {
    // bring the element to the extreme points
    if (contentOffsetY > 70 && contentOffsetY < 160) {
      hideQrCode();
    } else if (contentOffsetY <= 85 && contentOffsetY > 0) {
      showQrCode();
    }

    // switch the element if press a button
    if (contentOffsetY === 0) {
      hideQrCode();
    } else if (contentOffsetY === 160) {
      showQrCode();
    }

    // scroll to top
    if (contentOffsetY > 160) {
      showQrCode();
    }
  };

  const showQrCode = () => animateScroll(0);
  const hideQrCode = () => animateScroll(160);

  const animateScroll = (y: number) => {
    if (scrollViewRef !== null && scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({ y, animated: true });
    }
  };

  return (
    <Column style={[styles.root, style]}>
      {isDefined(screenTitle) ? (
        <HeaderSecondaryScreen title={screenTitle} icons={icons} navigationType={navigationType} />
      ) : (
        <HeaderMainScreen openQrCode={switchQrCodeVisibility} />
      )}

      <Animated.View style={styles.layout} />

      <Animated.ScrollView
        ref={scrollViewRef}
        onTouchEnd={onTouchEnd}
        onScroll={onScroll}
        scrollEventThrottle={10}
        scrollEnabled={!isLocked}
        style={styles.container}
      >
        {!isDefined(screenTitle) && (
          <View style={styles.qrCodeWrapper}>
            <HeaderQRCode contentOffsetY={contentOffsetY} />
          </View>
        )}
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>

      <NavigationBar />
    </Column>
  );
};
