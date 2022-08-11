import { useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { useDelayedEffect } from '../../../hooks/use-delayed-effect.hook';

export const useFlatListRef = <T>({ data, selectedIndex }: { data: T[]; selectedIndex: number }) => {
  const flatListRef = useRef<FlatList>(null);

  const scrollToSelectedIndex = () => {
    const index = selectedIndex > -1 ? selectedIndex : 0;

    if (data.length && selectedIndex > -1) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  useDelayedEffect(scrollToSelectedIndex, [data.length], 0);

  return { flatListRef };
};
