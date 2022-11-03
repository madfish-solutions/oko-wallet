import { IconNameEnum } from '../../../../components/icon/icon-name.enum';

export const MOCK_PERMISSIONS = [
  { id: 1, iconName: IconNameEnum.LockOpen, text: 'See wallet balance and activity' },
  { id: 2, iconName: IconNameEnum.LockOpen, text: 'Send request for transactions' },
  { id: 3, iconName: IconNameEnum.LockClosed, text: 'CANNOT move funds without permissions' }
];
