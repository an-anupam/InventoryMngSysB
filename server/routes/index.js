import express from 'express';
import { ObjectId } from 'mongodb';
import { mongoClient } from '../utils/database/mongo.databse.js';
import authenticationRouter from './auth.routes.js';
import userRouter from "./user.routes.js";
import orderRouter from "./order.routes.js";
import productsRouter from "./products.routes.js";
let router = express.Router();

router.use("/auth", authenticationRouter)
router.use("/user", userRouter)
router.use("/order", orderRouter)
router.use("/product", productsRouter)
export default router
