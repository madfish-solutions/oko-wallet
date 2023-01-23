import React, { FC, PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';

import { useUnlock } from '../../../hooks/use-unlock.hook';
import { ViewStyleProps } from '../../../interfaces/style.interface';

import { styles } from './screen-scroll-view.styles';

type Props = PropsWithChildren<{
  style?: ViewStyleProps;
  contentContainerStyle?: ViewStyleProps;
}>;

export const ScreenScrollView: FC<Props> = ({ style, contentContainerStyle, children }) => {
  const { isLocked } = useUnlock();

  return (
    <ScrollView scrollEventThrottle={10} scrollEnabled={!isLocked} contentContainerStyle={contentContainerStyle}>
      <View style={[styles.content, style]}>{children}</View>
    </ScrollView>
  );
};
