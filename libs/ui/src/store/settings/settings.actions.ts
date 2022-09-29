import { createAction } from '@reduxjs/toolkit';

export const setIsAnalyticsEnabled = createAction<boolean>('settings/SET_IS_ANALYTICS_ENABLED');
