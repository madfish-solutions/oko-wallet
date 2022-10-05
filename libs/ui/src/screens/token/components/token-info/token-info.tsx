import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { CopyText } from '../../../../components/copy-text/copy-text';
import { Currency } from '../../../../components/currency/currency';
import { InfoItem } from '../../../../components/info-item/info-item';
import { GAS_TOKEN_ADDRESS } from '../../../../constants/defaults';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useSelectedNetworkSelector } from '../../../../store/wallet/wallet.selectors';
import { getString } from '../../../../utils/get-string.utils';
import { getTokenDetailsUrl } from '../../../../utils/get-token-details-url.util';

import { styles } from './token-info.styles';

export const TokenInfo: FC = () => {
  const {
    params: {
      token: { tokenAddress, decimals }
    }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Token>>();
  const { explorerUrl, networkType } = useSelectedNetworkSelector();

  // TODO: get data from api
  const tvl = '410';
  const tradeVolume = '720';
  const web = 'https://quipuswap.com/';

  const tokenMetadata = {
    ...(tokenAddress !== GAS_TOKEN_ADDRESS && {
      contract: {
        name: 'Contract',
        value: <CopyText text={tokenAddress} />,
        prompt: getTokenDetailsUrl(tokenAddress, getString(explorerUrl), networkType)
      }
    }),
    ...(isDefined(web) && {
      web: {
        name: 'Web',
        value: 'quipuswap.com',
        prompt: 'https://quipuswap.com/'
      }
    }),
    ...(isDefined(tvl) && {
      tvl: {
        name: 'TVL',
        value: <Currency amount={tvl} />,
        prompt: null
      }
    }),
    ...(isDefined(tradeVolume) && {
      tradeVolume: {
        name: 'Trade Volume',
        value: <Currency amount={tradeVolume} />,
        prompt: null
      }
    }),
    decimal: {
      name: 'Decimal',
      value: decimals.toString(),
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
