import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";

import {applyRequestDto} from "@common/middlewares";
import {HttpError} from "@common/errors";

import {LoginDto, loginDto, RegisterDto, registerDto} from "./auth.schema";
import * as authService from "./auth.service";

export const register = [
  applyRequestDto(registerDto, "body"),
  async (
    req: Request<null, null, RegisterDto>,
    res: Response
  ): Promise<void> => {
    await authService.register(req.body);

    res.status(StatusCodes.CREATED).json({message: "Successfully registered!"});
  }
];

export const login = [
  applyRequestDto(loginDto, "body"),
  async (
    req: Request<null, null, LoginDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const {success, token, error} = await authService.login(req.body);

    if (success) {
      res.status(StatusCodes.OK).json({token});
    } else {
      next(new HttpError(StatusCodes.UNAUTHORIZED, error!));
    }
  }
];
