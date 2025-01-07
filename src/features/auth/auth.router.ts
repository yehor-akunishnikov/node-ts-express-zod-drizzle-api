import express from "express";

import * as handlers from "./auth.handlers";

export const authRouter = express.Router({mergeParams: true});

authRouter.post("/login", ...handlers.login);
authRouter.post("/register", ...handlers.register);
