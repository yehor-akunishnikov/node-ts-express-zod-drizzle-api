import express from "express";

import * as userController from "./controller";

export const userRouter = express.Router({mergeParams: true});

userController.getMe.attachToRouter(userRouter, "/me");
