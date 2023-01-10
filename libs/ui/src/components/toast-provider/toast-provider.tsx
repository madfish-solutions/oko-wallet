import React, { FC, PropsWithChildren } from 'react';
import { ToastProvider as ToastProviderBase } from 'react-native-toast-notifications';

import { ToastsEnum } from '../../enums/toasts.enums';

import { Toast } from './components/toast/toast';
import { offset } from './constants/offset';

const renderToast = <ToastProps extends { message: string | JSX.Element; type?: string }>({
  message,
  type
}: ToastProps) => <Toast message={message} type={type as ToastsEnum} />;

export const ToastProvider: FC<PropsWithChildren> = ({ children }) => (
  <ToastProviderBase offset={offset} renderToast={renderToast}>
    {children}
  </ToastProviderBase>
);
