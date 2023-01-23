import { isDefined } from '@rnw-community/shared';

import { ActivityData, SectionListActivityData } from '../interfaces/activity-data.interface';
import { TransactionTypeEnum } from '../interfaces/activity.enum';
import { ActivityFilterEnum } from '../modals/screens/activity-filter-selector/activity-filter.enum';

const filterActivity = (activity: SectionListActivityData[], condition: (activityData: ActivityData) => boolean) =>
  activity
    .map(item => ({
      title: item.title,
      data: item.data.filter(activityData => condition(activityData))
    }))
    .filter(item => item.data.length);

export const getFilteredActivity = (activity: SectionListActivityData[], filterType?: ActivityFilterEnum) => {
  if (isDefined(filterType)) {
    switch (filterType) {
      case ActivityFilterEnum.Send: {
        return filterActivity(activity, activityData => activityData.type === TransactionTypeEnum.Send);
      }
      case ActivityFilterEnum.Receive: {
        return filterActivity(activity, activityData => activityData.type === TransactionTypeEnum.Receive);
      }
      case ActivityFilterEnum.ContractCalls: {
        return filterActivity(activity, activityData => activityData.type === TransactionTypeEnum.ContractCalls);
      }
      case ActivityFilterEnum.Collectibles: {
        return filterActivity(activity, activityData => activityData.isCollectible ?? false);
      }
      case ActivityFilterEnum.AllActivity: {
        return activity;
      }
    }
  }

  return activity;
};
