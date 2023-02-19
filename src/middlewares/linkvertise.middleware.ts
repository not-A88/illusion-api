import express from 'express';

import { BadRequestError } from '../core/apiError';
import { exploit, ExploitConfig } from '../configs/exploit.config';

class linkvertiseMiddleWare {
  static async linkvertise_get(req: express.Request, res: express.Response, next: express.NextFunction) {
    let allowedExploitUsage: boolean = false;

    ExploitConfig.AllowedExploits.forEach((allowedExploit: exploit) => {
        if (req.headers[allowedExploit.ExploitHeader]) {
            allowedExploitUsage = true;
            return;
        }
    });
    if (req.headers.referer != 'https://linkvertise.com/' || !allowedExploitUsage) {
        return next(new BadRequestError(false));
    }
    next();
  }
}

export = linkvertiseMiddleWare;
