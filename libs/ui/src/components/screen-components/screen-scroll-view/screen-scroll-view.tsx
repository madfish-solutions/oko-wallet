import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { useUnlock } from '../../../hooks/use-unlock.hook';
import { ViewStyleProps } from '../../../interfaces/style.interface';

import { styles } from './screen-scroll-view.styles';

interface Props {
  style?: ViewStyleProps;
}

export const ScreenScrollView: FC<Props> = ({ style, children }) => {
  const { isLocked } = useUnlock();

  return (
    <ScrollView scrollEventThrottle={10} scrollEnabled={!isLocked}>
      <View style={[styles.content, style]}>{children}</View>
    </ScrollView>
  );
};
