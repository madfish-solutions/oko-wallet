import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: colors.bgGrey2,
    paddingLeft: getCustomSize(3),
    paddingRight: getCustomSize(3)
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: getCustomSize(1),
    paddingLeft: getCustomSize(1.25),
    color: colors.border
  },
  text: {
    display: 'flex',
    color: '#F8F8F8',
    ...typography.bodyInterSemiBold15,
    marginLeft: getCustomSize(0.75),
    alignItems: 'center'
  }
});
