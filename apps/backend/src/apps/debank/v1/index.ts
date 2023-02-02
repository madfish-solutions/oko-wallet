import { Router } from 'express';

import { deBankUser } from './user';

export const debankAPIv1 = Router().use('/user', deBankUser);

export default debankAPIv1;
