import { LoadableEntityState } from '../interfaces/loadable-entity-state.interface';
import { createEntity } from '../utils/entity.utils';

export interface AppInfoRootState {
  appInfo: AppInfoState;
}

export interface AppInfoState {
  randomBalance: LoadableEntityState<number>;
}

export const appInfoInitialState: AppInfoState = {
  randomBalance: createEntity(0)
};
