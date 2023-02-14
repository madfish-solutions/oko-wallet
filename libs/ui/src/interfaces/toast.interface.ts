import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';

interface ToastData {
  description?: string | JSX.Element;
  isShowTimerLine?: boolean;
}

export interface Toast {
  message: ToastProps['message'];
  duration?: number;
  data?: ToastData;
}
