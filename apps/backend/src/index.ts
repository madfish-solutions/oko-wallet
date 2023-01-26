import express, { Application } from 'express';

import debank from './apps/debank';
import config from './config';

const port = config.PORT;

const app: Application = express();

app.use('/debank', debank);

app.listen(port, () => console.log(`app listening on port ${port}`));
