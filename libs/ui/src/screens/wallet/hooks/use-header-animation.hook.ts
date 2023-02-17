import { useNavigationState } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { isWeb } from 'shared';

import { useScrollToOffset } from '../../../hooks/use-scroll-to-element.hook';
import { isFullpage } from '../../../utils/location.utils';
import { HIDE_QR_CODE, MIDDLE_VALUE, SHOW_QR_CODE } from '../constants/dimensions';

export const useHeaderAnimation = () => {
  const [contentOffsetY, setContentOffsetY] = useState(isWeb ? HIDE_QR_CODE : SHOW_QR_CODE);
  const routeIndex = useNavigationState(state => state.index);

  const { scrollViewRef, scrollToOffset } = useScrollToOffset();

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    setContentOffsetY(offsetY);
  };

  const onTouchEnd = () => {
    bringTheElementToTheExtremePoint();
  };

  const qrCodeVisibility = () => {
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

  useEffect(() => {
    if (contentOffsetY === HIDE_QR_CODE) {
      hideQrCode(false);
    }
  }, [contentOffsetY, isFullpage, routeIndex]);

  const scrollToTop = () => {
    if (contentOffsetY > HIDE_QR_CODE) {
      showQrCode();
    }
  };

  const showQrCode = (animated?: boolean) => animateScroll(SHOW_QR_CODE, animated);
  const hideQrCode = (animated?: boolean) => animateScroll(HIDE_QR_CODE, animated);

  const animateScroll = (y: number, animated = true) => {
    scrollToOffset(y, animated);
  };

  return {
    onScroll,
    onTouchEnd,
    changeQrCodeVisibility: qrCodeVisibility,
    contentOffsetY,
    scrollViewRef
  };
};
