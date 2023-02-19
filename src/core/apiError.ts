import { Response } from 'express';
import AppConfig from '../configs/app.config';

import * as Responses from './apiResponse';

enum ErrorType {
  BLACKLISTED = 'BlackListedError',
  BLACKLISTWARNING = 'BlackListWarningError',
  KEYNOTFOUND = 'KeyNotFound',
  ACCESS_TOKEN = 'AccessTokenError',
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError'
}

export abstract class ApiError extends Error {
  constructor(public type: ErrorType, protected encrypt: boolean) {
    super(type);
  }

  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.INTERNAL:
        return new Responses.InternalErrorResponse().send(res, err.encrypt);
      case ErrorType.NOT_FOUND:
        return new Responses.PageNotFoundResponse().send(res, err.encrypt);
      case ErrorType.BAD_REQUEST:
        return new Responses.BadRequestResponse().send(res, err.encrypt);
      case ErrorType.FORBIDDEN:
        return new Responses.NoPermissionFailureResponse().send(res, err.encrypt);
      case ErrorType.BLACKLISTED:
        return new Responses.BlackListedResponse().send(res, err.encrypt);
      case ErrorType.BLACKLISTWARNING:
        return new Responses.BlackListedResponse().send(res, err.encrypt);
      case ErrorType.KEYNOTFOUND:
        return new Responses.UnauthorizedResponse().send(res, err.encrypt);
      default: {
        if (AppConfig.environment === 'development') {
          //  console.log(err.name);
          //   console.log(err.message);
        }
        return new Responses.InternalErrorResponse().send(res, err.encrypt);
      }
    }
  }
}

export class InternalError extends ApiError {
  constructor(encrypt: boolean) {
    super(ErrorType.INTERNAL, encrypt);
  }
}

export class BadRequestError extends ApiError {
  constructor(encrypt: boolean) {
    super(ErrorType.BAD_REQUEST, encrypt);
  }
}

export class NotFoundError extends ApiError {
  constructor(encrypt: boolean) {
    super(ErrorType.NOT_FOUND, encrypt);
  }
}

export class ForbiddenError extends ApiError {
  constructor(encrypt: boolean) {
    super(ErrorType.FORBIDDEN, encrypt);
  }
}

export class BlacklistedError extends ApiError {
  constructor(encrypt: boolean) {
    super(ErrorType.BLACKLISTED, encrypt);
  }
}

export class BlacklistWarningError extends ApiError {
  constructor(encrypt: boolean) {
    super(ErrorType.BLACKLISTWARNING, encrypt);
  }
}

export class AccountNotFoundError extends ApiError {
  constructor(encrypt: boolean) {
    super(ErrorType.KEYNOTFOUND, encrypt);
  }
}

export class BaseNotFoundError extends ApiError {
  constructor(encrypt: boolean) {
    super(ErrorType.NOT_FOUND, encrypt);
  }
}