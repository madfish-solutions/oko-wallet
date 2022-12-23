import { SectionListProps } from 'react-native';

export const getItemLayoutSectionList =
  <T, N>(itemHeight: number): SectionListProps<T, N>['getItemLayout'] =>
  (_, index) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index
  });
