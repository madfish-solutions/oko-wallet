import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';

import { getDebankId } from '../../../../api/utils/get-debank-id.util';
import { ActivitySectionList } from '../../../../components/activity-section-list/activity-section-list';
import { GAS_TOKEN_ADDRESS } from '../../../../constants/defaults';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';

export const Activity: FC = () => {
  const {
    params: {
      token: { tokenAddress: basicTokenAddress }
    }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Token>>();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();

  const tokenAddress =
    getDebankId(chainId) !== 'klay' && basicTokenAddress === GAS_TOKEN_ADDRESS
      ? getDebankId(chainId)
      : basicTokenAddress;

  return <ActivitySectionList publicKeyHash={publicKeyHash} chainId={chainId} tokenAddress={tokenAddress} />;
};
