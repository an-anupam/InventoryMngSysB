import express from "express"
import { handelAdminAuthLogin, handleAdminAuthLogout } from "../modules/auth/auth.js";

let authenticationRouter = express.Router();

authenticationRouter.post("/user/sign-in", handelAdminAuthLogin);
authenticationRouter.get("/user/sign-out", handleAdminAuthLogout);

export default authenticationRouter