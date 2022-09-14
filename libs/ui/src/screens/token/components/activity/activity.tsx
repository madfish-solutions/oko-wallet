import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';

import { ActivitySectionList } from '../../../../components/activity/activity-section-list';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';

export const Activity: FC = () => {
  const {
    params: {
      token: { tokenAddress }
    }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Token>>();
  const selectedPublicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();

  return <ActivitySectionList publicKeyHash={selectedPublicKeyHash} chainId={chainId} tokenAddress={tokenAddress} />;
};
