import express, { Application } from 'express';
import config from './config';
import debank from './apps/debank';

const port = config.PORT;

const app: Application = express();

app.use('/debank', debank);

app.listen(port, () => console.log(`app listening on port ${port}`));
