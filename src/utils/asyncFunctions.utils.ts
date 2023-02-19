import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, Response: Response, next: NextFunction) => Promise<any>;

export = (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  execution(req, res, next).catch((reason) => {
    next(reason);
  });
};
