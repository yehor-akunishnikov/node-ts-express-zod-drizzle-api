import express from "express";

import * as handlers from "./passive-skill.handlers";

export const passiveSkillRouter = express.Router({mergeParams: true});

passiveSkillRouter.get("/", ...handlers.getAll);
