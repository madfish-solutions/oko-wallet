import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { checkActiveApplicationSession } from '../../../../utils/check-active-application-session.util';

const { isMaximiseScreenOpened } = checkActiveApplicationSession();

export const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bgGrey2,
    ...(isMaximiseScreenOpened && { borderWidth: getCustomSize(0.125), borderColor: colors.bgGrey2 })
  },
  backgroundSpace: {
    height: getCustomSize(3)
  },
  container: {
    justifyContent: 'center',
    backgroundColor: colors.navGrey1,
    borderTopLeftRadius: getCustomSize(1.75),
    borderTopRightRadius: getCustomSize(1.75),
    padding: getCustomSize(2)
  },
  title: {
    color: colors.textGrey1,
    marginLeft: 'auto',
    ...typography.bodyInterRegular15
  },
  closeButton: {
    marginLeft: 'auto'
  }
});
