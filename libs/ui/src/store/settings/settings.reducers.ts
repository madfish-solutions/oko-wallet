import { createReducer } from '@reduxjs/toolkit';

import { addNewNetworkAction, changeNetworkAction } from './settings.actions';
import { settingsInitialState, SettingsState } from './settings.state';

export const settingsReducers = createReducer<SettingsState>(settingsInitialState, builder => {
  builder.addCase(changeNetworkAction, (state, { payload: networkName }) => ({
    ...state,
    selectedNetwork: networkName
  }));
  builder.addCase(addNewNetworkAction, (state, { payload: network }) => ({
    ...state,
    networks: {
      ...state.networks,
      [network.name]: {
        ...network
      }
    },
    selectedNetwork: network.name
  }));
});
