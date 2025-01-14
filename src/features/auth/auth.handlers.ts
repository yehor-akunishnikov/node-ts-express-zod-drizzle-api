import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";

import {applyRequestDTO} from "@common/middlewares";
import {HttpError} from "@common/errors";

import {LoginDTO, loginDTO, RegisterDTO, registerDTO} from "./auth.schema";
import * as authService from "./auth.service";

export const register = [
  applyRequestDTO(registerDTO, "body"),
  async (
    req: Request<unknown, unknown, RegisterDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await authService.register(req.body);

      res.status(StatusCodes.CREATED).json({message: "Successfully registered!"});
    } catch (e) {
      next(e);
    }
  }
];

export const login = [
  applyRequestDTO(loginDTO, "body"),
  async (
    req: Request<unknown, unknown, LoginDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {success, token, error} = await authService.login(req.body);

      if (success) {
        res.status(StatusCodes.OK).json({token});
      } else {
        next(new HttpError(StatusCodes.UNAUTHORIZED, error!));
      }
    } catch (e) {
      next(e);
    }
  }
];
