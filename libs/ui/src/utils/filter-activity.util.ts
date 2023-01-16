import { isDefined } from '@rnw-community/shared';

import { ActivityData, SectionListActivityData } from '../interfaces/activity-data.interface';
import { TransactionTypeEnum } from '../interfaces/activity.enum';
import { ActivityFilterEnum } from '../modals/screens/activity-filter-selector/activity-filter.enum';

const filterActivity = (activity: SectionListActivityData[], condition: (activity: ActivityData) => boolean) =>
  activity
    .map(item => ({
      title: item.title,
      data: item.data.filter(activity => condition(activity))
    }))
    .filter(item => item.data.length);

export const getFilteredActivity = (activity: SectionListActivityData[], filterType?: ActivityFilterEnum) => {
  if (isDefined(filterType)) {
    switch (filterType) {
      case ActivityFilterEnum.Send: {
        return filterActivity(activity, activity => activity.type === TransactionTypeEnum.Send);
      }
      case ActivityFilterEnum.Receive: {
        return filterActivity(activity, activity => activity.type === TransactionTypeEnum.Receive);
      }
      case ActivityFilterEnum.ContractCalls: {
        return filterActivity(activity, activity => activity.type === TransactionTypeEnum.ContractCalls);
      }
      case ActivityFilterEnum.Collectibles: {
        return filterActivity(activity, activity => activity.isCollectible ?? false);
      }
      case ActivityFilterEnum.AllActivity: {
        return activity;
      }
    }
  }

  return activity;
};
