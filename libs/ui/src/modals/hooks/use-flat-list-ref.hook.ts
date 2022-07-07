import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';

export const useFlatListRef = <T>({ data, selectedIndex }: { data: T[]; selectedIndex: number }) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const scrollToSelectedIndex = async () => {
      await new Promise(resolve => setTimeout(resolve, 100));

      flatListRef.current?.scrollToIndex({ index: selectedIndex, animated: true });
    };

    scrollToSelectedIndex();
  }, [data, selectedIndex]);

  return { flatListRef };
};
