import express from "express";

import * as authController from "./controller";

export const authRouter = express.Router({mergeParams: true});

authController.register.attachToRouter(authRouter, "/register");
authController.login.attachToRouter(authRouter, "/login");
