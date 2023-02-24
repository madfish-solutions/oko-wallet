import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  date: {
    ...typography.numbersIBMPlexSansMedium11,
    borderBottomWidth: getCustomSize(0.03125),
    borderBottomColor: colors.border2,
    paddingVertical: getCustomSize(),
    marginHorizontal: getCustomSize(2),
    backgroundColor: colors.navGrey1,
    color: colors.textGrey3
  },
  loading: {
    padding: getCustomSize(2)
  }
});
