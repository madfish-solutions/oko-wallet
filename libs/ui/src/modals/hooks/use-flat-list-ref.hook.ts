import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';

export const useFlatListRef = <T>({ data, selectedIndex }: { data: T[]; selectedIndex: number }) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const scrollToSelectedIndex = () => {
      const index = selectedIndex > -1 ? selectedIndex : 0;

      if (data.length && selectedIndex > -1) {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      }
    };

    scrollToSelectedIndex();
  }, [selectedIndex]);

  return { flatListRef };
};
