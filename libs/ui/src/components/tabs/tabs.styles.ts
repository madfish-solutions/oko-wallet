import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    height: '100%',
    flex: 1
  },
  tabs: {
    position: 'relative',
    borderBottomWidth: getCustomSize(0.0625),
    borderColor: colors.border2,
    marginTop: getCustomSize(1.375),
    marginLeft: getCustomSize(2)
  },
  element: {
    paddingBottom: getCustomSize()
  },
  text: {
    ...typography.bodyInterRegular15
  },
  active: {
    color: colors.orange
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderBottomWidth: getCustomSize(0.5),
    borderTopLeftRadius: getCustomSize(0.5),
    borderTopRightRadius: getCustomSize(0.5),
    borderColor: colors.orange
  },
  divider: {
    width: getCustomSize(3.75)
  },
  component: {
    flex: 1,
    overflow: 'hidden'
  }
});
