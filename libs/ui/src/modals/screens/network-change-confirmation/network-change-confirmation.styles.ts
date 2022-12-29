import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    height: '100%',
    paddingHorizontal: getCustomSize(2)
  },
  buttonPanel: {
    alignItems: 'flex-end',
    paddingVertical: getCustomSize(2),
    marginTop: getCustomSize(2),
    marginHorizontal: getCustomSize(2),
    gap: getCustomSize(2)
  },
  dappLogo: {
    justifyContent: 'center',
    marginTop: getCustomSize(3.25),
    marginBottom: getCustomSize(3)
  },
  explorerLink: {
    maxWidth: getCustomSize(26.5),
    color: colors.orange,
    ...typography.captionInterSemiBold13
  },
  addressRow: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize(1.5)
  },
  smallText: {
    ...typography.captionInterRegular11,
    color: colors.textGrey3
  },
  divider: {
    height: getCustomSize(0.125),
    backgroundColor: colors.bgGrey3,
    width: '100%'
  },
  chainChange: {
    marginTop: getCustomSize(3.25),
    paddingHorizontal: getCustomSize(7),
    justifyContent: 'space-between'
  },
  grayText: {
    ...typography.captionInterRegular13,
    color: colors.textGrey3,
    marginTop: getCustomSize(3.625)
  },
  chainSelector: {
    padding: getCustomSize(1.5),
    backgroundColor: colors.bgGrey4,
    borderRadius: getCustomSize(),
    marginTop: getCustomSize(0.75)
  },
  chainName: {
    marginLeft: getCustomSize(0.5),
    ...typography.bodyInterSemiBold15
  },
  addressTo: {
    marginTop: getCustomSize(1.125)
  }
});
