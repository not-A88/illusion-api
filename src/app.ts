import express from 'express';

import fs from 'fs';
import path from 'path';

import * as bodyparser from 'body-parser';

import compression from 'compression';

import Database from './database/database';
import AppConfig from './configs/app.config';

import { ApiError, NotFoundError, InternalError } from './core/apiError';
import { encrypt } from './utils/encryption.utils';

const app: express.Application = express();

app.use(compression());
app.set('etag', false);

app.use(bodyparser.json({ limit: '10mb' }));
app.use(bodyparser.urlencoded({ limit: '10mb', extended: true }));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader('X-Powered-By', 'Ghandy n Masterzz');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  req.headers['if-none-match'] = '';
  req.headers['if-modified-since'] = '';
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    return res.status(403).json({});
  }
  return next();
});

fs.readdirSync(path.join(__dirname, 'routes')).forEach((file) => {
  if (path.extname(file) === '.js') {
    console.log(file);
    const router = require(`./routes/${file}`);
    if (router.routeName) 
    {
      app.use(router.routeName, router.router);
    }
    else {
      app.use(router.router);
    }

    //app.use(router);
  }
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  next(new NotFoundError(true));
});

app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error instanceof ApiError) {
    ApiError.handle(error, res);
    return;
  } else {
    console.log(error.message);
    if (AppConfig.environment === 'development') {
      return res.status(500).send(error.message);
    }
    ApiError.handle(new InternalError(true), res);
    return;
  }
});



Database.Connect(() => {
  app.listen(AppConfig.port, () => {
    console.log(`server started at \nhttp://localhost:${AppConfig.port}`);
  });
});
