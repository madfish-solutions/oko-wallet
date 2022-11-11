import { useToast as useToastBase } from 'react-native-toast-notifications';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';

import { ToastsEnum } from '../enums/toasts.enums';

export const useToast = () => {
  const toast = useToastBase();

  const showSuccessToast = (message: ToastProps['message']) => toast.show(message, { type: ToastsEnum.success });
  const showErrorToast = (message: ToastProps['message']) => toast.show(message, { type: ToastsEnum.error });
  const showWarningToast = (message: ToastProps['message']) => toast.show(message, { type: ToastsEnum.warning });

  return {
    showSuccessToast,
    showErrorToast,
    showWarningToast
  };
};
