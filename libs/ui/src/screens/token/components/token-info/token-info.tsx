import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';
import { ScrollView } from 'react-native';

import { CopyText } from '../../../../components/copy-text/copy-text';
import { Currency } from '../../../../components/currency/currency';
import { GAS_TOKEN_ADDRESS } from '../../../../constants/defaults';
import { NetworkTypeEnum } from '../../../../enums/network-type.enum';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useSelectedNetworkSelector } from '../../../../store/wallet/wallet.selectors';

import { Item } from './components/item/item';
import { styles } from './token-info.styles';

export const TokenInfo: FC = () => {
  const {
    params: {
      token: { tokenAddress, decimals }
    }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Token>>();
  const { explorerUrl, networkType } = useSelectedNetworkSelector();

  const explorerUrlPrefix = networkType === NetworkTypeEnum.EVM ? 'token/' : '';

  const viewTokenDetails = (txHash: string) => `${explorerUrl}${explorerUrlPrefix}${txHash}`;

  // TODO: get data from api
  const tvl = '410';
  const tradeVolume = '720';
  const web = 'https://quipuswap.com/';

  const tokenMetadata = {
    ...(tokenAddress !== GAS_TOKEN_ADDRESS && {
      contract: {
        name: 'Contract',
        value: <CopyText address={tokenAddress} />,
        prompt: viewTokenDetails(tokenAddress)
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
        <Item key={name} name={name} value={value} prompt={prompt} />
      ))}
    </ScrollView>
  );
};
