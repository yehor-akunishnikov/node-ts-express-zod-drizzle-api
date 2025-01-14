import express from "express";

import * as handlers from "./character.handlers";

export const characterRouter = express.Router({mergeParams: true});

characterRouter.get("/", ...handlers.getAll);
characterRouter.get("/:id", ...handlers.getById);
characterRouter.post("/", ...handlers.create);
