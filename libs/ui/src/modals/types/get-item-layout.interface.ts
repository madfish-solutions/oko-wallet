export type GetItemLayout<T> = (
  data: T[] | null | undefined,
  index: number
) => { length: number; offset: number; index: number };
