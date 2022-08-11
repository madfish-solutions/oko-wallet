import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { useUnlock } from '../../../hooks/use-unlock.hook';
import { ViewStyleProps } from '../../../interfaces/style.interface';
import { Title } from '../../header/components/title/title';
import { BaseScreenColumn } from '../components/base-screen-column/base-screen-column';

import { styles } from './ternary-screen-container.styles';

interface Props {
  screenTitle: string;
  style?: ViewStyleProps;
  scrollViewWrapper?: boolean;
}

export const TernaryScreenContainer: FC<Props> = ({ screenTitle, style, children, scrollViewWrapper = true }) => {
  const { isLocked } = useUnlock();

  return (
    <BaseScreenColumn style={style}>
      <View style={styles.titleContainer}>
        <Title title={screenTitle} />
      </View>

      {scrollViewWrapper ? (
        <ScrollView scrollEventThrottle={10} scrollEnabled={!isLocked}>
          <View style={styles.content}>{children}</View>
        </ScrollView>
      ) : (
        children
      )}
    </BaseScreenColumn>
  );
};
