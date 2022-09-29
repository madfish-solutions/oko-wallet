import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    paddingHorizontal: getCustomSize(2)
  },
  flatlist: {
    flex: 1
  },
  amount: {
    ...typography.numbersIBMPlexSansMedium20
  },
  container: {
    borderRadius: getCustomSize(2),
    borderWidth: getCustomSize(0.25),
    borderColor: colors.bgGrey2,
    marginBottom: getCustomSize(2)
  },
  icon: {
    margin: getCustomSize(),
    padding: getCustomSize(0.5)
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
  exploreDapps: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    marginTop: getCustomSize(10),
    marginBottom: getCustomSize(9),
    marginHorizontal: getCustomSize(10.5),
    borderRadius: getCustomSize(1.75)
  },
  exploreText: {
    paddingHorizontal: getCustomSize(1.5),
    paddingVertical: getCustomSize(),
    ...typography.taglineInterSemiBoldUppercase13
  }
});
