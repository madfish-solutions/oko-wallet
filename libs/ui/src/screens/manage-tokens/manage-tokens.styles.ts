import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingTop: 0
  },
  token: {
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: getCustomSize(2)
  },
  borderBottom: {
    borderBottomWidth: getCustomSize(0.125),
    borderBottomColor: colors.border2
  },
  editIcon: {
    marginRight: getCustomSize(8.125)
  },
  switcherContainer: {
    position: 'relative'
  },
  status: {
    position: 'absolute',
    right: '130%',
    ...typography.captionInterSemiBold11,
    color: colors.textGrey2
  }
});
