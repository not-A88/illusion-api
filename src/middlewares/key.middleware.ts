import express from 'express';
import AppConfig from '../configs/app.config';
import { exploit, ExploitConfig } from '../configs/exploit.config';
import { BadRequestError, ForbiddenError } from '../core/apiError';
import { decrypt } from '../utils/encryption.utils';

class keyMiddleWare {
  static async getkey_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { user_id } = req.body;
    const correctUserIdUsage: boolean = !(user_id && typeof user_id === 'string');
    if (correctUserIdUsage) {
      return next(new BadRequestError(false));
    }
    next();
  }

  static async createkey_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { user_id } = req.body;
    const correctUserIdUsage: boolean = !(user_id && typeof user_id === 'string');
    if (correctUserIdUsage) {
      return next(new BadRequestError(false));
    }
    next();
  }

  static async blacklist_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { user_id, blacklist } = req.body;
    const correctUserIdUsage: boolean = !(user_id && typeof user_id === 'string');
    const correctBlacklistUsage: boolean = !(blacklist && (blacklist === 'true' || blacklist === 'false'));
    if (correctUserIdUsage || correctBlacklistUsage) {
      return next(new BadRequestError(false));
    }
    next();
  }

  static async deletekey_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { user_id } = req.body;
    const correctUserIdUsage: boolean = !(user_id && typeof user_id === 'string');
    if (correctUserIdUsage) {
      return next(new BadRequestError(false));
    }
    next();
  }

  static async clear_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { user_id } = req.body;
    const correctUserIdUsage: boolean = !(user_id && typeof user_id === 'string');
    if (correctUserIdUsage) {
      return next(new BadRequestError(false));
    }
    next();
  }

  static async checkkey_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { key } = req.body;
    const ip: string = (req.socket.remoteAddress || req.headers['x-forwarded-for'])!.toString();
    const correctKeyUsage: boolean = !(key && typeof key === 'string');
    const correctIpUsage: boolean = !(ip && typeof ip === 'string' && ip !== '');
    let allowedExploitUsage: boolean = false;

    ExploitConfig.AllowedExploits.forEach((allowedExploit: exploit) => {
      if (req.headers[allowedExploit.ExploitHeader]) {
        allowedExploitUsage = true;
        return;
      }
    });

    if (correctKeyUsage || correctIpUsage || !allowedExploitUsage) {
      return next(new BadRequestError(true));
    }
    next();
  }

  static async checkifstaff_middleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const passwordKey = req.body.passwordKey;
    /*
    const ipRaw: string = (req.socket.remoteAddress || req.headers['x-forwarded-for'])!.toString();
    const ip: string = GetipAddress(ipRaw);
    const allowedIpUsage: boolean = !AppConfig.ipAllowed.find((Allowedip) => Allowedip === ip);
    console.log(ip);
    console.log(allowedIpUsage);
    if (allowedIpUsage) {
      return next(new ForbiddenError());
    }

    next();
    */
    //console.log(req.body);
    if (passwordKey && passwordKey === AppConfig.privateApiKey) {
      delete req.body.passwordKey;
      next();
      return;
    } else {
      return next(new ForbiddenError(true));
    }
  }

  static async decryption_middleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log('\n\request Body:');
    console.log(req.body);

    let failed: boolean = false;
    for (let e in req.body) {
      try {
        const unEncrptedKey = decrypt(e);
        const unEncrptedValue = decrypt(req.body[e]);
        console.log(unEncrptedKey);
        req.body[unEncrptedKey as string] = unEncrptedValue;
        delete req.body[e];
      } catch (err) {
        console.log(err);
        failed = true;
      }
    }
    console.log('\n\nnew Body:');
    console.log(req.body);
    if (failed) {
      return next(new BadRequestError(true));
    }
    next();
  }
}

export = keyMiddleWare;
