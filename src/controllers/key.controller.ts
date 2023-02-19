import express from 'express';
import { BadRequestError, BlacklistedError, BlacklistWarningError, AccountNotFoundError } from '../core/apiError';
import { SuccessResponse } from '../core/apiResponse';

import Key, { KeyModel } from '../database/models/key.model';

import BlacklistWarning, { BlacklistWarningSchema, BlacklistWarningModel } from '../database/models/blacklistWarning.model';
import BlacklistConfig from '../configs/blacklist.config';
import Execution, { ExecutionModel } from '../database/models/execution.model';
import FingerPrint, { FingerPrintModel } from '../database/models/fingerprint.model';

import { exploit, ExploitConfig } from '../configs/exploit.config';

import makekey from '../utils/randomString.utils';

//import { BlacklistReasons } from '../erum/BlacklistReasons.enum';

import GetipAddress from '../utils/ipAddress.utils';

function identifyExploit(req: express.Request): [string, string] {
  let ExploitNameReturn: string = '';
  let fingerPrintReturn: string = '';

  ExploitConfig.AllowedExploits.forEach((allowedExploit: exploit) => {
    if (req.headers[allowedExploit.ExploitHeader]) {
      ExploitNameReturn = allowedExploit.ExploitName;
      fingerPrintReturn = JSON.stringify(req.headers[allowedExploit.ExploitHeader]);
      return;
    }
  });
  return [ExploitNameReturn, fingerPrintReturn];
}

class keyController {
  static async getkey_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { user_id } = req.body;

    const Key: Key = await KeyModel.findOne({ discordID: user_id });
    if (!Key) throw new AccountNotFoundError(false);

    return new SuccessResponse(Key).send(res);
  }

  static async createkey_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { user_id } = req.body;

    console.log(user_id);
    const DoseItExist: boolean = await KeyModel.exists({ discordID: user_id });
    console.log(DoseItExist);
    if (DoseItExist) throw new AccountNotFoundError(false);

    const newkey: string = makekey(24);
    const Key = new KeyModel({
      key: newkey,
      discordID: user_id
    });

    Key.save();

    return new SuccessResponse({
      Key: newkey
    }).send(res);
  }

  static async blacklist_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { user_id, blacklist /*, reason*/ } = req.body;

    const Key: Key = await KeyModel.findOne({ discordID: user_id });
    if (!Key) throw new AccountNotFoundError(false);

    Key.blackList = blacklist;
    Key.save();

    return new SuccessResponse({
      blackList: Key.blackList,
      blackList_reason: Key.blackList_reason
    }).send(res);
  }

  static async deletekey_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { user_id } = req.body;

    const Key: Key = await KeyModel.findOne({ discordID: user_id });
    if (!Key) throw new AccountNotFoundError(false);

    Key.remove();

    return new SuccessResponse().send(res);
  }

  static async clear_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { user_id } = req.body;

    const Key: Key = await KeyModel.findOne({ discordID: user_id });
    if (!Key) throw new AccountNotFoundError(false);

    Key.fingerPrint = [];
    Key.save();

    return new SuccessResponse().send(res);
  }

  static async checkkey_post(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { key } = req.body;
    const time: number = Date.now();

    const Key: Key = await KeyModel.findOne({ key: key });
    if (!Key) throw new BadRequestError(true);

    if (Key.blackList) {
      throw new BlacklistedError(true);
    }

    const ipRaw: string = (req.socket.remoteAddress || req.headers['x-forwarded-for'])!.toString();
    const ip: string = GetipAddress(ipRaw);
    
    /*
    if (Key.ip && Key.ip !== ip) {
        Key.blackListWarningNum += 1;
        const blacklistReason = new BlacklistWarningModel({
          blackListNumber: Key.blackListWarningNum,
          blackListReason: BlacklistReasons.IP_Offensive
        });

        Key.blackList_reason.push(blacklistReason as BlacklistWarning);

        if (Key.blackListWarningNum === BlacklistConfig.blacklistOn) {
          Key.blackList = true;
          throw new BlacklistedError();
        }
                Key.save();
        throw new BlacklistWarningError();
      } else {
        Key.ip = ip!.toString();
      }
    */
    if (Key.ip) {
    } else {
      Key.ip = ip!.toString();
    }

    const [exploitName, fingerPrint] = identifyExploit(req);

    //Key.execution.push(executionLog as Execution);

    const fp = Key.fingerPrint.find((fingerprint) => fingerprint.exploitName === exploitName);

    if (fp) {
      if (fingerPrint !== fp.fingerPrint) {
        Key.blackListWarningNum += 1;
        const blacklistReason = new BlacklistWarningModel({
          blackListNumber: Key.blackListWarningNum,
          blackListReason: 'Different Exploit Account Used - Exploit Offensive'
        });

        Key.blackList_reason.push(blacklistReason as BlacklistWarning);

        const executionLog = new ExecutionModel({
          exploitName: exploitName,
          successfulExecution: false,
          usingFingerPrint: fingerPrint
        });

        Key.execution.push(executionLog as Execution);

        if (Key.blackListWarningNum === BlacklistConfig.blacklistOn) {
          Key.blackList = true;
          Key.save();
          throw new BlacklistedError(true);
        }

        Key.save();
        throw new BlacklistWarningError(true);
      }
    } else {
      const fingerPrintModel = new FingerPrintModel({
        exploitName: exploitName,
        fingerPrint: fingerPrint
      });

      Key.fingerPrint.push(fingerPrintModel as FingerPrint);
    }

    const executionLog = new ExecutionModel({
      exploitName: exploitName,
      successfulExecution: true,
      usingFingerPrint: fingerPrint
    });

    Key.execution.push(executionLog as Execution);

    Key.save();
    return new SuccessResponse({
      whitelisted: true,
      fingerprint: fingerPrint,
      processTime: time
    }).sendEncrypted(res);
  }
}

export = keyController;
