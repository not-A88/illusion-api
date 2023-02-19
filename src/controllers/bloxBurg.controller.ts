import express from 'express';
import { BaseNotFoundError, AccountNotFoundError, ForbiddenError } from '../core/apiError';
import { SuccessResponse } from '../core/apiResponse';

import Key, { KeyModel } from '../database/models/key.model';

import Bloxburg, { BloxBurgModel } from "../database/models/bloxburg.model"

import makekey from '../utils/randomString.utils';

class bloxBurgController {
  //  static async getallbases_post(req: express.Request, res: express.Response, next: express.NextFunction) {
  //    const { key } = req.body;
  
  //    const Key: Key = await KeyModel.findOne({ key: key });
  //    if (!Key) throw new AccountNotFoundError(false);
  
  //    const Base = await BloxBurgModel.find({ userID: Key.discordID }).select("baseJson baseID -_id");
  //    if (!Base) throw new BaseNotFoundError(false);
  
  //    return new SuccessResponse(Base).send(res);
  //  }

  static async getbasebyID_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { base_id } = req.body;

    const Base: Bloxburg = await BloxBurgModel.findOne({ _id: base_id }).select("baseJson -_id");
    if (!Base) throw new BaseNotFoundError(false);

    return new SuccessResponse(Base).send(res);
  }

  static async createbase_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { base_json } = req.body;
    
    const bjsonExists: Bloxburg = await BloxBurgModel.findOne({ baseJson: base_json });
    if (bjsonExists) return new SuccessResponse(
      await BloxBurgModel.findOne({ baseJson: base_json }).select("_id")
    ).send(res);
    
    const Base = new BloxBurgModel({
        baseID: 'illusion_base',
        baseJson: String(base_json)
    });

    Base.save();

    return new SuccessResponse({
      BaseID: Base._id
    }).send(res);
  }

  //  static async deletebase_post(req: express.Request, res: express.Response, next: express.NextFunction) {
  //    const { key, base_id } = req.body;
  
  //    const Key: Key = await KeyModel.findOne({ key: key });
  //    if (!Key) throw new AccountNotFoundError(false);
  
  //    const Base: Bloxburg = await BloxBurgModel.findOne({ baseID: base_id });
  //    if (!Base) throw new BaseNotFoundError(false);
  
  //    Base.remove();
  
  //    return new SuccessResponse().send(res);
  //  }
}

export = bloxBurgController;
