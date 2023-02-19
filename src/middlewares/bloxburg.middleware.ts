import express from 'express';

import { BadRequestError } from '../core/apiError';

class bloxBurgMiddleWare {
  static async createbase_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { base_json } = req.body;
    console.log(base_json)
    const correctBaseJsonUsage: boolean = !(base_json && typeof base_json === 'string');
    if (correctBaseJsonUsage) {
      return next(new BadRequestError(false));
    }
    next();
  }

  static async deletebase_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { base_id } = req.body;
    const correctBaseIdUsage: boolean = !(base_id && typeof base_id === 'string');

    if (correctBaseIdUsage) {
      return next(new BadRequestError(false));
    }
    next();
  }

  static async getbases_post(req: express.Request, res: express.Response, next: express.NextFunction) {

    console.log('checkkey_middleware3');
    next();
  }

  static async getbase_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { base_id } = req.body;
    const correctBaseIdUsage: boolean = !(base_id && typeof base_id === 'string');

    if (correctBaseIdUsage) {
      return next(new BadRequestError(true));
    }
    next();
  }
}

export = bloxBurgMiddleWare;
