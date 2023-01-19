import React, { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';

import { styles } from './item-container.styles';

export const ItemContainer: FC<PropsWithChildren> = ({ children }) => <View style={styles.root}>{children}</View>;
