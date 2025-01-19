import {Request, Response, NextFunction} from "express";
import {StatusCodes} from "http-status-codes";

import {transformOutput} from "@common/transformers";

import {passiveSkillOutputDTO} from "./schemas/output.schema";
import * as usersService from "./passive-skill.service";

export const getAll = [
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const passiveSkills = await usersService.findMany();

      res.status(StatusCodes.OK).json(transformOutput(passiveSkillOutputDTO, passiveSkills));
    } catch (e) {
      next(e);
    }
  }
];
