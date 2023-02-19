import express from 'express';

import asyncHandler from '../utils/asyncFunctions.utils';

import bloxBurgMiddleWare from "../middlewares/bloxburg.middleware"
import keyMiddleWare from '../middlewares/key.middleware';

import bloxBurgController from '../controllers/bloxBurg.controller';

const routeName : string = "/bloxburg";
const router: express.Router = express.Router();

//public
router.post(
  '/getbase',
  [ bloxBurgMiddleWare.getbase_post ],
  asyncHandler(async (req, res, next) => bloxBurgController.getbasebyID_post(req, res, next))
);

//  router.post(
//      '/getbases',
//      [ bloxBurgMiddleWare.getbases_post ],
//      asyncHandler(async (req, res, next) => bloxBurgController.getallbases_post(req, res, next))
//  );

router.post(
  '/createbase',
  [ bloxBurgMiddleWare.createbase_post ],
  asyncHandler(async (req, res, next) => bloxBurgController.createbase_post(req, res, next))
);

//  router.post(
//    '/deletebase',
//    [ bloxBurgMiddleWare.deletebase_post ],
//    asyncHandler(async (req, res, next) => bloxBurgController.deletebase_post(req, res, next))
//  );

export {
  routeName,
  router
}

//export = router;
