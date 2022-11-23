import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  divider: {
    height: getCustomSize(0.125),
    backgroundColor: colors.bgGrey3,
    width: '100%'
  },
  greyLabel: {
    ...typography.captionInterRegular13,
    color: colors.textGrey3
  },
  greyText: {
    ...typography.captionInterRegular11,
    color: colors.textGrey3
  },
  allowsBlock: {
    marginTop: getCustomSize(3.75),
    flex: 1
  },
  allowsText: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: getCustomSize(1.5)
  },
  allowStatus: {
    marginRight: getCustomSize(0.5)
  }
});
