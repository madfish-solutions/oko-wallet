import { Option } from '../../../../components/dropdown/option.interface';

type LockTime = Option<number>;

export const lockTimes: LockTime[] = [
  {
    id: 1,
    title: '1 minute',
    value: 1
  }
];
