import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native-gesture-handler';

export const useFlatListRef = <T>({ data, selectedIndex }: { data: T[]; selectedIndex: number }) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const scrollToSelectedIndex = async () => {
      // TODO: Make an error
      // await new Promise(resolve => setTimeout(resolve, 0));

      const index = selectedIndex > -1 ? selectedIndex : 0;

      if (data.length) {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      }
    };

    scrollToSelectedIndex();
  }, [data, selectedIndex]);

  return { flatListRef };
};
