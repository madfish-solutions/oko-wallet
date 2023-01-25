import axios from 'axios';
import { Request, Response, NextFunction, Router } from 'express';
import config from '../../config';
import { formDeBankHeaderWithKey } from './header';

const debankRequest = axios.create({
  baseURL: config.DEBANK.API_URL,
  headers: formDeBankHeaderWithKey(config.DEBANK)
});

const debank = Router();

debank.get('/*', (req: Request, res: Response, next: NextFunction) =>
  debankRequest
    .get(req.params[0], {
      params: req.query
    })
    .then(response => res.send(response.data))
    .catch(next)
);
export default debank;
