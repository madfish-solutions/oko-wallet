import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { Address } from '../../../../components/address/address';
import { Currency } from '../../../../components/currency/currency';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';

import { Item } from './components/item/item';
import { styles } from './token-info.styles';

export const TokenInfo: FC = () => {
  const {
    params: {
      token: { tokenAddress, decimals }
    }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Token>>();

  // TODO: get data from api
  const tvl = '410';
  const tradeVolume = '720';
  const web = 'https://quipuswap.com/';

  const tokenMetadata = {
    ...(tokenAddress !== 'gas_token' && {
      contract: {
        name: 'Contract',
        value: <Address address={tokenAddress} />,
        prompt: 'https://quipuswap.com/'
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
        value: <Currency amount="410 M" />,
        prompt: null
      }
    }),
    ...(isDefined(tradeVolume) && {
      tradeVolume: {
        name: 'Trade Volume',
        value: <Currency amount="620 M" />,
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
        <Item key={name} name={name} value={value} prompt={prompt} />
      ))}
    </ScrollView>
  );
};
