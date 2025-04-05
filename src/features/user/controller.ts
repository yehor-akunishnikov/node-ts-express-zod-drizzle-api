import {StatusCodes} from "http-status-codes";

import {LQRequestMethod} from "@common/types/utils";
import {LQController} from "@common/utils/feature";

import * as userTransformers from "./transformers";
import * as userRepo from "./repo";

export const getMe = new LQController(
  {
    method: LQRequestMethod.GET,
    isProtected: true
  },
  async (req, res) => {
    const {data} = await userRepo.findOneById(req.userSession.id);

    if (data) {
      res.status(StatusCodes.OK).json(userTransformers.getMeOutput(data));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({message: "Not found"});
    }
  }
);
