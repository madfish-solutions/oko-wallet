import React, { FC } from 'react';
import { View } from 'react-native';

import { styles } from './item-container.styles';

export const ItemContainer: FC = ({ children }) => <View style={styles.root}>{children}</View>;
