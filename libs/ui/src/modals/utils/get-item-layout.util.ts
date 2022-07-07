import { userDetailsTotalHeight } from '../constants/dimensions';

export const getItemLayout = <T>(data: T[] | null | undefined, index: number) => ({
  length: userDetailsTotalHeight,
  offset: userDetailsTotalHeight * index,
  index
});
