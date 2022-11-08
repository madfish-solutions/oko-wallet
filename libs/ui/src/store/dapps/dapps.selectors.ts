import { useSelector } from 'react-redux';

import { DappsRootState } from './dapps.state';

export const useAllDapps = () => useSelector<DappsRootState, Record<any, any>>(({ dapps }) => dapps);
