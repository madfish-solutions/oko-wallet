import { StyleSheet } from 'react-native';
import { isMobile } from 'shared';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  description: {
    width: '100%',
    marginTop: getCustomSize(2.25),
    marginBottom: getCustomSize(2.375),
    textAlign: 'center',
    color: colors.textGrey2,
    ...typography.captionInterRegular11
  },
  wrapper: {
    width: '100%',
    paddingHorizontal: getCustomSize(2)
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: getCustomSize(2),
    borderBottomWidth: getCustomSize(0.0625),
    borderBottomColor: colors.border2
  },
  title: {
    ...typography.bodyInterRegular15
  },
  footer: {
    paddingHorizontal: getCustomSize(2),
    paddingBottom: getCustomSize(isMobile ? 4 : 2)
  },
  cancelButton: {
    height: getCustomSize(5)
  }
});
