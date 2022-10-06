import { OnEventFn } from '@rnw-community/shared';
import { GestureResponderEvent } from 'react-native';

export interface FooterButtons {
  submitTitle: string;
  cancelTitle?: string;
  isSubmitDisabled?: boolean;
  onSubmitPress: OnEventFn<GestureResponderEvent>;
  onCancelPress: OnEventFn<GestureResponderEvent>;
}
