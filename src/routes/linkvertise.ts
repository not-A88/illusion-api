import express from 'express';

import asyncHandler from '../utils/asyncFunctions.utils';

import linkvertiseController from '../controllers/linkvertise.controller';

import linkvertiseMiddleWare from '../middlewares/linkvertise.middleware';

const routeName : string = "/linkvertise";
const router: express.Router = express.Router();

router.get( 
    '/bloxburg', 
    [ linkvertiseMiddleWare.linkvertise_get ], 
    asyncHandler(async (req, res, next) => linkvertiseController.linkvertise_get(req, res, next) 
));

router.get( 
    '/doors', 
    [ linkvertiseMiddleWare.linkvertise_get ], 
    asyncHandler(async (req, res, next) => linkvertiseController.linkvertise_getDoors(req, res, next) 
));

export {
    routeName,
    router
}
