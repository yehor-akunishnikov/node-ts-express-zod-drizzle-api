import {StatusCodes} from "http-status-codes";

import {LQRequestMethod} from "@common/types/utils";
import {LQController} from "@common/utils/feature";
import {HttpError} from "@common/errors";

import {registerValidators, loginValidators} from "./validators";
import * as authService from "./service";

export const register = new LQController(
  {
    method: LQRequestMethod.POST,
    validators: registerValidators
  },
  async (req, res, next) => {
    if (req.body.parsingResult.success) {
      const {success, error} = await authService.register(req.body.parsingResult.data);

      if (success) {
        res.status(StatusCodes.CREATED).json({message: "Successfully registered"});
      } else {
        next(error);
      }
    } else {
      next(new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, "Invalid payload"));
    }
  }
);

export const login = new LQController(
  {
    method: LQRequestMethod.POST,
    validators: loginValidators
  },
  async (req, res, next) => {
    if (req.body.parsingResult.success) {
      const {success, error, data} = await authService.login(req.body.parsingResult.data);

      if (success) {
        res.status(StatusCodes.OK).json({token: data});
      } else {
        next(error);
      }
    } else {
      next(new HttpError(StatusCodes.UNPROCESSABLE_ENTITY, "Invalid payload"));
    }
  }
);
