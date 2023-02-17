import React, { FC } from 'react';
import { View } from 'react-native';

import { ViewStyleProps } from '../../../../interfaces/style.interface';
import { LoaderSizeEnum } from '../../enums';
import { Loader } from '../../loader';

import { styles } from './wrapped-loader.styles';

interface Props {
  style?: ViewStyleProps;
  color?: string;
}

export const WrappedLoader: FC<Props> = ({ color, style }) => (
  <View style={[styles.root, style]}>
    <Loader size={LoaderSizeEnum.Large} color={color} />
  </View>
);
