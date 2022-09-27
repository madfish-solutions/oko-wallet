import React, { FC } from 'react';
import { View } from 'react-native';

import { styles } from './grey-container.styles';

export const GreyContainer: FC = ({ children }) => <View style={styles.root}>{children}</View>;
