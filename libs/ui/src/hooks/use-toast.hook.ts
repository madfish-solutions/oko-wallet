import { useToast as useToastBase } from 'react-native-toast-notifications';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';

import { ToastData } from '../components/toast/toast';
import { ToastsEnum } from '../enums/toasts.enums';

export interface Toast {
  message: ToastProps['message'];
  duration?: number;
  data?: ToastData;
}

interface ToastBase extends Toast {
  type: ToastsEnum;
}

const TOAST_LIFETIME = 5000;

export const useToast = () => {
  const toastBase = useToastBase();

  const toast = ({ message, duration = TOAST_LIFETIME, type, data }: ToastBase) =>
    toastBase.show(message, { duration, type, data });

  const showSuccessToast = (args: Toast) => toast({ type: ToastsEnum.success, ...args });
  const showWarningToast = (args: Toast) => toast({ type: ToastsEnum.warning, ...args });
  const showErrorToast = (args: Toast) => toast({ type: ToastsEnum.error, ...args });
  const showInfoToast = (args: Toast) => toast({ type: ToastsEnum.info, ...args });

  return {
    showSuccessToast,
    showWarningToast,
    showErrorToast,
    showInfoToast
  };
};
