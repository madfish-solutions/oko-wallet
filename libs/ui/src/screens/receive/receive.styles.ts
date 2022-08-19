import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  prompt: {
    justifyContent: 'space-between',
    paddingHorizontal: getCustomSize(1.5),
    paddingVertical: getCustomSize(1.25),
    borderRadius: getCustomSize(1.65),
    backgroundColor: colors.bgGrey2
  },
  propmtText: {
    ...typography.captionInterRegular13,
    color: colors.textGrey3
  },
  container: {
    alignItems: 'center',
    marginHorizontal: 'auto',
    maxWidth: getCustomSize(26.25)
  },
  qrCodeWrapper: {
    marginVertical: isWeb ? getCustomSize(3) : getCustomSize(8),
    borderRadius: getCustomSize(0.25),
    overflow: 'hidden'
  },
  text: {
    marginBottom: getCustomSize(),
    ...typography.captionInterRegular11,
    color: colors.textGrey2,
    textAlign: 'center'
  },
  addressWrapper: {
    width: '100%'
  },
  address: {
    ...typography.numbersIBMPlexSansMedium13,
    textAlign: 'center'
  },
  actions: {
    justifyContent: 'center',
    marginTop: getCustomSize(2)
  },
  shareIcon: {
    marginRight: getCustomSize(3)
  }
});
