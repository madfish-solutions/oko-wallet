import { TransitionPresets, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { isAndroid } from '../../../utils/platform.utils';
import { HeaderBackButton } from '../components/header-back-button/header-back-button';
import { HeaderCloseButton } from '../components/header-close-button/header-close-button';
import { HeaderTitle } from '../components/header-title.native/header-title';

export const modalScreenOptions: StackNavigationOptions = {
  presentation: 'modal',
  headerStyle: {
    height: getCustomSize(7),
    backgroundColor: colors.navGrey1,
    borderBottomWidth: getCustomSize(0.0625),
    borderBottomColor: colors.border2
  },
  headerTitleAlign: 'center',
  headerLeft: () => null,
  headerTitle: HeaderTitle,
  headerRight: () => <HeaderCloseButton />,
  ...(isAndroid && TransitionPresets.ModalPresentationIOS)
};

export const modalScreenOptionsWithBackButton: StackNavigationOptions = {
  ...modalScreenOptions,
  headerLeft: () => <HeaderBackButton />
};
