import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  dateWrapper: {
    borderBottomWidth: getCustomSize(0.03125),
    borderBottomColor: colors.border2,
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: colors.navGrey1,
    marginHorizontal: getCustomSize(2),
    marginRight: isWeb ? getCustomSize(1.5) : getCustomSize(2)
  },
  dateText: {
    ...typography.numbersIBMPlexSansMedium11,
    marginVertical: getCustomSize(),
    color: colors.textGrey3
  }
});
