import e, { Response } from 'express';
import { encrypt } from '../utils/encryption.utils';

enum ResponseStatusCode {
  SUCCESS = 202, //
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500
}

const valueNeeded: string[] = [
  'key',
  'fingerPrint',
  'ip',
  'discordID',
  'blackList',
  'blackListWarningNum',
  'blackList_reason',
  'execution',
  'createdAt',
  'response',
  'success',
  'error',
  'message'
];
/*
function encryptValues(arr, callback?) {
  let finalReturn = {};
  for (let key in arr) {
    if (!valueNeeded.includes(key)) {
      continue;
    }
    const newKey = encrypt(String(key));

    if (typeof arr[key] === 'object') {
      if (Array.isArray(arr[key])) {
        finalReturn[newKey] = [];
      } else {
        encryptValues(arr[key], (finalArray) => {
          finalReturn[newKey] = finalArray;
        });
      }
    } else {
      if (typeof arr[key] === 'undefined') {
        finalReturn[newKey] = undefined;
      } else {
        finalReturn[newKey] = encrypt(String(arr[key]));
      }
    }
  }
  if (callback) {
    callback(finalReturn);
  } else {
    return finalReturn;
  }
}
*/
function encryptValues(e) {
  const loopThough = (arr, callback) => {
    let finalReturn = {};
    for (let key in arr) {
      if (!valueNeeded.includes(key)) {
        continue;
      }
      const newKey = encrypt(String(key));

      if (typeof arr[key] === 'object') {
        if (Array.isArray(arr[key])) {
          finalReturn[newKey] = [];
        } else {
          loopThough(arr[key], (finalArray) => {
            finalReturn[newKey] = finalArray;
          });
        }
      } else {
        if (String(arr[key]) === 'null') {
          finalReturn[newKey] = null;
        } else {
          finalReturn[newKey] = encrypt(String(arr[key]));
        }
      }
    }

    callback(finalReturn);
  };

  let newObject = {};
  loopThough(e, (arr) => {
    newObject = arr;
  });

  return newObject;
}

abstract class ApiResponse {
  constructor(protected status: ResponseStatusCode, protected message?: string | object | undefined) {}

  protected prepare<T extends ApiResponse>(res: Response, encrypt: boolean, response: T): Response {
    return res.status(this.status).send(ApiResponse.parse(encrypt, response));
  }

  public send(res: Response, encrypt = false): Response {
    return this.prepare<ApiResponse>(res, encrypt, this);
  }

  private static parse<T extends ApiResponse>(encrypt, response: T): Object {
    let returnValue = {};
    if (response.status === ResponseStatusCode.SUCCESS) {
      if (response.message) {
        returnValue = {
          success: true,
          response: response.message
        };
      } else {
        returnValue = {
          success: true
        };
      }
    } else {
      if (response.message) {
        returnValue = {
          success: false,
          error: response.status,
          message: response.message
        };
      } else {
        returnValue = {
          success: false,
          error: response.status
        };
      }
    }
    
    if (encrypt) {
      //returnValue = encryptValues(returnValue)!;
    }

    return returnValue;
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(data?: Object) {
    super(ResponseStatusCode.SUCCESS, data);
  }

  send(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, false, this);
  }

  sendEncrypted(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, true, this);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor() {
    super(ResponseStatusCode.INTERNAL_ERROR);
  }
}

export class NoPermissionFailureResponse extends ApiResponse {
  constructor() {
    super(ResponseStatusCode.FORBIDDEN);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor() {
    super(ResponseStatusCode.BAD_REQUEST);
  }
}

export class PageNotFoundResponse extends ApiResponse {
  constructor() {
    super(ResponseStatusCode.NOT_FOUND);
  }
}

export class UnauthorizedResponse extends ApiResponse {
  constructor() {
    super(ResponseStatusCode.UNAUTHORIZED);
  }
}

export class BlackListedResponse extends ApiResponse {
  constructor() {
    super(ResponseStatusCode.UNAUTHORIZED);
  }
}

export class BlackListWarningResponse extends ApiResponse {
  constructor() {
    super(ResponseStatusCode.UNAUTHORIZED, 'blacklistwarning');
  }
}
