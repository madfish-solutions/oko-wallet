import { Option } from '../../../components/dropdown/option.interface';

import { ActivityFilterEnum } from './activity-filter.enum';

export const ACTIVITIES_TYPES: Option<ActivityFilterEnum>[] = [
  {
    id: 1,
    title: 'All Activity',
    value: ActivityFilterEnum.AllActivity
  },
  {
    id: 2,
    title: 'Send',
    value: ActivityFilterEnum.Send
  },
  {
    id: 3,
    title: 'Receive',
    value: ActivityFilterEnum.Receive
  },
  {
    id: 4,
    title: 'Contract Interaction',
    value: ActivityFilterEnum.ContractInteraction
  },
  {
    id: 5,
    title: 'Collectibles',
    value: ActivityFilterEnum.Collectibles
  }
];
