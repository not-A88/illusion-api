import express from 'express';

import asyncHandler from '../utils/asyncFunctions.utils';

import keyController from '../controllers/key.controller';

import keyMiddleWare from '../middlewares/key.middleware';

const router: express.Router = express.Router();

router.post(
  '/getkey',
  [/*keyMiddleWare.decryption_middleware,*/ keyMiddleWare.checkifstaff_middleware, keyMiddleWare.getkey_post],
  asyncHandler(async (req, res, next) => keyController.getkey_post(req, res, next))
);

router.post(
  '/createkey',
  [/*keyMiddleWare.decryption_middleware,*/ keyMiddleWare.checkifstaff_middleware, keyMiddleWare.createkey_post],
  asyncHandler(async (req, res, next) => keyController.createkey_post(req, res, next))
);

router.post(
  '/deletekey',
  [/*keyMiddleWare.decryption_middleware,*/ keyMiddleWare.checkifstaff_middleware, keyMiddleWare.deletekey_post],
  asyncHandler(async (req, res, next) => keyController.deletekey_post(req, res, next))
);

router.post(
  '/clear',
  [/*keyMiddleWare.decryption_middleware,*/ keyMiddleWare.checkifstaff_middleware, keyMiddleWare.clear_post],
  asyncHandler(async (req, res, next) => keyController.clear_post(req, res, next))
);

router.post(
  '/blacklist',
  [/*keyMiddleWare.checkifstaff_middleware,*/ keyMiddleWare.checkifstaff_middleware, keyMiddleWare.blacklist_post],
  asyncHandler(async (req, res, next) => keyController.blacklist_post(req, res, next))
);

//public
router.post(
  '/checkkey',
  [keyMiddleWare.decryption_middleware, keyMiddleWare.checkkey_post],
  asyncHandler(async (req, res, next) => keyController.checkkey_post(req, res, next))
);

//export = router;
export {
  router
}
