import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    borderRadius: getCustomSize(2),
    overflow: 'hidden'
  },
  tokenInfoContainer: {
    justifyContent: 'space-between',
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(0.5),
    marginVertical: getCustomSize(0.25),
    padding: getCustomSize(1)
  },
  balanceContainer: {
    alignItems: 'flex-end'
  },
  tokenImage: {
    borderColor: colors.bgGrey3,
    width: getCustomSize(3),
    height: getCustomSize(3),
    borderWidth: getCustomSize(0.25),
    borderRadius: getCustomSize(1.375),
    marginRight: getCustomSize(0.5)
  },
  text: {
    color: colors.textGrey1,
    lineHeight: 18,
    textTransform: 'uppercase',
    ...typography.numbersIBMPlexSansMedium13
  },
  token: {
    width: 'auto'
  },
  gasToken: {
    marginLeft: getCustomSize(0.25)
  },
  usdBalance: {
    marginTop: getCustomSize(0.25)
  }
});
