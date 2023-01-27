import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { CopyText } from '../../../../components/copy-text/copy-text';
import { InfoItem } from '../../../../components/info-item/info-item';
import { GAS_TOKEN_ADDRESS } from '../../../../constants/defaults';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useCurrentTokenSelector, useSelectedNetworkSelector } from '../../../../store/wallet/wallet.selectors';
import { getString } from '../../../../utils/get-string.utils';
import { getTokenDetailsUrl } from '../../../../utils/get-token-details-url.util';

import { styles } from './token-info.styles';

export const TokenInfo: FC = () => {
  const {
    params: { tokenAddress, tokenId }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Token>>();
  const { explorerUrl, networkType } = useSelectedNetworkSelector();

  const token = useCurrentTokenSelector(tokenAddress, tokenId);

  const tokenMetadata = {
    ...(tokenAddress !== GAS_TOKEN_ADDRESS && {
      contract: {
        name: 'Contract',
        value: <CopyText text={tokenAddress} />,
        prompt: getTokenDetailsUrl({
          address: tokenAddress,
          explorerUrl: getString(explorerUrl),
          networkType
        })
      }
    }),
    decimal: {
      name: 'Decimal',
      value: token.decimals.toString(),
      prompt: null
    }
  };

  return (
    <ScrollView style={styles.root}>
      {Object.values(tokenMetadata).map(({ name, value, prompt }) => (
        <InfoItem key={name} name={name} value={value} prompt={prompt} />
      ))}
    </ScrollView>
  );
};
