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

import { HIDE_QR_CODE, MIDDLE_VALUE, SHOW_QR_CODE } from './constants';
import { styles } from './screen-container.styles';

interface Props extends HeaderIconsProps {
  screenTitle?: string;
  navigationType?: HeaderSideTypeEnum;
  style?: ViewStyleProps;
}

export const ScreenContainer: FC<Props> = ({ screenTitle, icons, navigationType, style, children }) => {
  const { isLocked } = useUnlock();

  const [contentOffsetY, setContentOffsetY] = useState(isWeb ? HIDE_QR_CODE : SHOW_QR_CODE);

  const scrollViewRef = useRef<ScrollView>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    setContentOffsetY(offsetY);
  };

  useEffect(() => {
    qrCodeInitialValue();
  }, []);

  const qrCodeInitialValue = () => {
    if (isWeb) {
      hideQrCode(false);
    } else {
      showQrCode(false);
    }
  };

  const onTouchEnd = () => {
    bringTheElementToTheExtremePoint();
  };

  const qrCodeAnimation = () => {
    bringTheElementToTheExtremePoint();
    switchQrCodeVisibility();
    scrollToTop();
  };

  const bringTheElementToTheExtremePoint = () => {
    if (contentOffsetY > MIDDLE_VALUE && contentOffsetY < HIDE_QR_CODE) {
      hideQrCode();
    } else if (contentOffsetY <= MIDDLE_VALUE && contentOffsetY > SHOW_QR_CODE) {
      showQrCode();
    }
  };

  const switchQrCodeVisibility = () => {
    if (contentOffsetY === SHOW_QR_CODE) {
      hideQrCode();
    } else if (contentOffsetY === HIDE_QR_CODE) {
      showQrCode();
    }
  };

  const scrollToTop = () => {
    if (contentOffsetY > HIDE_QR_CODE) {
      showQrCode();
    }
  };

  const showQrCode = (animated?: boolean) => animateScroll(SHOW_QR_CODE, animated);
  const hideQrCode = (animated?: boolean) => animateScroll(HIDE_QR_CODE, animated);

  const animateScroll = (y: number, animated = true) => {
    if (scrollViewRef !== null && scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({ y, animated });
    }
  };

  return (
    <Column style={[styles.root, style]}>
      {isDefined(screenTitle) ? (
        <HeaderSecondaryScreen title={screenTitle} icons={icons} navigationType={navigationType} />
      ) : (
        <HeaderMainScreen qrCodeVisibility={qrCodeAnimation} />
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
