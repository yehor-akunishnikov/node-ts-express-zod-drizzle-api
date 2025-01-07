import express from "express";

import * as handlers from "./user.handlers";

export const userRouter = express.Router({mergeParams: true});

userRouter.get("/", ...handlers.getAll);
userRouter.get("/me", ...handlers.getMe);
userRouter.patch("/me", ...handlers.updateMe);
userRouter.get("/:id", ...handlers.getById);
