import express from 'express';
import { genSalt, hash, hashSync, genSaltSync } from "bcrypt"
import { BaseNotFoundError, AccountNotFoundError, ForbiddenError } from '../core/apiError';
import { SuccessResponse } from '../core/apiResponse';
import { exploit, ExploitConfig } from '../configs/exploit.config';

class linkvertiseController {
  static async linkvertise_get(req: express.Request, res: express.Response, next: express.NextFunction) {
    //  const salt: string = "$2b$04$LinkVertiseBloxburgSalt"
    //  const hash: string = hashSync(req.ip, salt)

    return new SuccessResponse({ key: 'BloxyBurgyHeHe' }).send(res);
  }
  static async linkvertise_getDoors(req: express.Request, res: express.Response, next: express.NextFunction) {
    //  const salt: string = "$2b$04$LinkVertiseBloxburgSalt"
    //  const hash: string = hashSync(req.ip, salt)

    return new SuccessResponse({ key: 'MasterzzIsBehindYourDoor' }).send(res);
  }
}

export = linkvertiseController;
//  argon2.hash({ pass: 'password', salt: 'somesalt' })
