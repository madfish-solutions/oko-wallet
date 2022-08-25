import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    marginLeft: getCustomSize(1.5),
    marginRight: getCustomSize(2)
  },
  dateWrapper: {
    borderBottomWidth: getCustomSize(0.03125),
    borderBottomColor: colors.border2,
    justifyContent: 'space-between',
    width: '100%'
  },
  dateText: {
    ...typography.numbersIBMPlexSansMedium11,
    marginVertical: getCustomSize(),
    color: colors.textGrey3
  },
  wrapper: {
    borderBottomWidth: getCustomSize(0.03125),
    borderBottomColor: colors.border2,
    justifyContent: 'space-between',
    flex: 1,
    width: '100%'
  },
  leftContent: {
    paddingVertical: getCustomSize(),
    justifyContent: 'space-between',
    flex: 1
  },
  send: {
    ...typography.bodyInterSemiBold15
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
    ...typography.numbersIBMPlexSansMedium11,
    marginHorizontal: getCustomSize()
  },
  hash: {
    alignItems: 'center',
    marginBottom: getCustomSize()
  },
  amount: {
    ...typography.numbersIBMPlexSansMedium15,
    flex: 1
  },
  amountContainer: {
    alignSelf: 'flex-end'
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
