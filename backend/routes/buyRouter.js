import express from 'express';
import { addToBuy, getUserBuy, updateBuy } from '../controllers/buyController.js';
import authUser from '../middleware/auth.js';

const buyRouter = express.Router();

buyRouter.post('/add', authUser, addToBuy);
buyRouter.post('/get', authUser, getUserBuy);
buyRouter.post('/update', authUser, updateBuy);

export default buyRouter;



