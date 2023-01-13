import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    width: '91%',
    padding: getCustomSize(1.5),
    marginTop: getCustomSize(),
    borderRadius: getCustomSize(1.75)
  },
  container: {
    alignItems: 'flex-start',
    width: '100%'
  },
  description: {
    marginTop: getCustomSize()
  },
  descriptionText: {
    ...typography.captionInterRegular13,
    color: colors.textGrey3
  },
  success: {
    backgroundColor: colors.bgNavyGreen
  },
  warning: {
    backgroundColor: colors.bgGrey6
  },
  error: {
    backgroundColor: colors.bgNavyRed
  },
  info: {
    backgroundColor: colors.grey
  },
  icon: {
    marginRight: getCustomSize(0.5)
  },
  text: {
    paddingVertical: getCustomSize(0.375),
    ...typography.captionInterSemiBold13
  },
  timerLine: {
    height: getCustomSize(0.25),
    width: '100%',
    marginTop: getCustomSize(),
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(1.75),
    overflow: 'hidden'
  },
  line: {
    height: '100%'
  },
  successLine: {
    backgroundColor: colors.green
  },
  warningLine: {
    backgroundColor: colors.yellow
  },
  errorLine: {
    backgroundColor: colors.red
  },
  infoLine: {
    backgroundColor: colors.border1
  },
  closeButton: {
    marginLeft: 'auto'
  }
});
