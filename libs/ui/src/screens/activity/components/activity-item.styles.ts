import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    marginLeft: getCustomSize(1.5),
    marginRight: getCustomSize(2)
  },
  wrapper: {
    borderBottomWidth: getCustomSize(0.03125),
    borderBottomColor: colors.border2,
    justifyContent: 'space-between',
    flex: 1,
    width: '100%'
  },
  content: {
    height: '100%',
    paddingVertical: getCustomSize(),
    justifyContent: 'space-between',
    flex: 1
  },
  send: {
    ...typography.bodyInterSemiBold15,
    textTransform: 'capitalize'
  },
  sendWrapper: {
    marginBottom: getCustomSize(1.5)
  },
  statusWrapper: {
    marginRight: getCustomSize()
  },
  failed: {
    borderRadius: getCustomSize(0.5),
    borderWidth: getCustomSize(0.125),
    borderColor: colors.red
  },
  applied: {
    borderRadius: getCustomSize(0.5),
    borderWidth: getCustomSize(0.125),
    borderColor: colors.green
  },
  pending: {
    borderRadius: getCustomSize(0.5),
    borderWidth: getCustomSize(0.125),
    borderColor: colors.border2
  },
  statusText: {
    ...typography.numbersIBMPlexSansBold8,
    paddingHorizontal: getCustomSize(0.5),
    paddingVertical: getCustomSize(0.1875)
  },
  smallGreyText: {
    ...typography.numbersIBMPlexSansRegular11,
    color: colors.textGrey2
  },
  txHash: {
    marginLeft: getCustomSize(),
    marginRight: getCustomSize(0.5),
    paddingHorizontal: getCustomSize(0.5),
    paddingVertical: getCustomSize(0.25)
  },
  txHashText: {
    ...typography.numbersIBMPlexSansMedium11,
    textTransform: 'lowercase'
  },
  hash: {
    alignItems: 'center',
    marginBottom: getCustomSize()
  },
  amount: {
    ...typography.numbersIBMPlexSansMedium15
  },
  symbol: {
    color: colors.textGrey2,
    textTransform: 'uppercase'
  },
  transfer: {
    alignItems: 'flex-end'
  },
  transferMargin: {
    marginTop: getCustomSize()
  },
  transferItem: {
    marginTop: getCustomSize(0.5)
  },
  minus: {
    marginRight: getCustomSize(0.25),
    ...typography.numbersIBMPlexSansMedium15,
    color: colors.red
  },
  plus: {
    marginRight: getCustomSize(0.25),
    ...typography.numbersIBMPlexSansMedium15,
    color: colors.green
  },
  rightContainer: {
    alignSelf: 'flex-end',
    flex: 1,
    marginBottom: getCustomSize(1.5)
  },
  amountContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  projectName: {
    ...typography.captionInterSemiBold11,
    color: colors.textGrey2
  },
  projectNameMargin: {
    marginBottom: getCustomSize()
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    marginLeft: getCustomSize(0.5)
  }
});
