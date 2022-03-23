import express from 'express';
import { ObjectId } from 'mongodb';
import { mongoClient } from '../utils/database/mongo.databse.js';
import authenticationRouter from './auth.routes.js';
import userRouter from "./user.routes.js";
import orderRouter from "./order.routes.js";
let router = express.Router();

router.use("/auth", authenticationRouter)
router.use("/user", userRouter)
router.use("/order", orderRouter)

/* GET home page. */
router.get('/', async function (req, res, next) {

  let data = await mongoClient.db().collection("users").findOne({ _id: ObjectId("623a7f94f2498c54187a1ea3") })
  res.json(data);
});

export default router
