export interface AppInfoRootState {
  appInfo: AppInfoState;
}

export interface AppInfoState {
  isUnlocked: boolean;
}

export const appInfoInitialState: AppInfoState = {
  isUnlocked: true
};
