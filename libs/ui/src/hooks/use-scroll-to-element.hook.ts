import { useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export const useScrollToOffset = () => {
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToOffset = (offsetY = 500, animated = true) => {
    setTimeout(() => {
      if (scrollViewRef?.current !== null) {
        scrollViewRef.current.scrollTo({ y: offsetY, animated });
      }
    }, 0);
  };

  return {
    scrollViewRef,
    scrollToOffset
  };
};
