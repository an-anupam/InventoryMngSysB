import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import { initMongoDB } from './utils/database/mongo.databse.js';
import passport from "passport"
import userStrategy from "./modules/auth/localStrategy.js";
import {deserializeUser, serializeUser} from "./modules/auth/serializers.js";
import cors from "cors"
import session from "express-session"
import {generateSessionOptions} from "./utils/session/session.js";

await initMongoDB();

var app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(await generateSessionOptions()));

app.use(passport.initialize());
app.use(passport.session());
passport.use("userStrategy", userStrategy)
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use('/', indexRouter);
export default app;
