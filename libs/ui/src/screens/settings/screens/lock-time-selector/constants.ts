import { Option } from '../../../../components/dropdown/option.interface';

type LockTime = Option<number>;

export const lockTimes: LockTime[] = [
  {
    id: 1,
    title: '1 minute',
    value: 1
  },
  {
    id: 2,
    title: '5 minutes',
    value: 5
  },
  {
    id: 3,
    title: '15 minutes',
    value: 15
  },
  {
    id: 4,
    title: '30 minutes',
    value: 30
  }
];
