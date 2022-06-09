import { AccountInterface } from '../../interfaces/account.interface';
import { NetworkInterface } from '../../interfaces/network.interface';

export interface ConfirmationProps {
  network: NetworkInterface;
  sender: AccountInterface;
}
