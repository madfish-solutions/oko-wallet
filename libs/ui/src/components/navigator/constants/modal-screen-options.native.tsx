import { TransitionPresets, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { isAndroid } from 'shared';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { HeaderBackButton } from '../components/header-back-button/header-back-button';
import { HeaderCloseButton } from '../components/header-close-button/header-close-button';
import { HeaderTitle } from '../components/header-title.native/header-title';

export const modalScreenOptions: StackNavigationOptions = {
  presentation: 'modal',
  headerStyle: {
    height: getCustomSize(7),
    backgroundColor: colors.navGrey1
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
