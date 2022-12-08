import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingHorizontal: getCustomSize(2)
  },
  amount: {
    ...typography.numbersIBMPlexSansMedium20
  },
  container: {
    borderRadius: getCustomSize(2),
    borderWidth: getCustomSize(0.25),
    borderColor: colors.bgGrey2,
    marginBottom: getCustomSize(2),
    marginHorizontal: getCustomSize(2),
    flex: 1
  },
  icon: {
    margin: getCustomSize(),
    padding: getCustomSize(0.5),
    backgroundColor: 'transparent'
  },
  explorerLink: {
    maxWidth: getCustomSize(26.5),
    color: colors.orange,
    marginLeft: getCustomSize(-0.5),
    ...typography.captionInterSemiBold13
  },
  topRow: {
    justifyContent: 'space-between'
  },
  deleteIcon: {
    marginRight: getCustomSize(1.5)
  },
  permissions: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: getCustomSize(3)
  },
  emptyIcon: {
    top: -90
  }
});
