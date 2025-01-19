import {Request, Response, NextFunction} from "express";
import passport from "passport";

import {applyRequestDTO} from "@common/middlewares";
import {transformOutput} from "@common/transformers";
import {AuthRequest} from "@common/types";

import {userOutputDTO} from "./schemas/output.schema";
import * as userService from "./user.service";
import {
  ManyUsersSearchQueryDTO,
  userSearchQueryDTO,
  userIdUrlParamDTO,
  UserIdUrlParamDTO,
  updateUserDTO,
  UpdateUserDTO
} from "./schemas/validation.schema";

export const getAll = [
  applyRequestDTO(userSearchQueryDTO, "query"),
  async (
    req: Request<unknown, unknown, unknown, ManyUsersSearchQueryDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await userService.findMany(req.query);

      res.json(transformOutput(userOutputDTO, users));
    } catch (e) {
      next(e);
    }
  }
];

export const getById = [
  applyRequestDTO(userIdUrlParamDTO, "params"),
  async (
    req: Request<UserIdUrlParamDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await userService.findOne({id: req.params.id});

      res.json(transformOutput(userOutputDTO, user));
    } catch (e) {
      next(e);
    }
  }
];

export const getMe = [
  passport.authenticate("jwt", {session: false}),
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await userService.findOne({id: req.user.id});

      res.json(transformOutput(userOutputDTO, user));
    } catch (e) {
      next(e);
    }
  }
];

export const updateMe = [
  passport.authenticate("jwt", {session: false}),
  applyRequestDTO(updateUserDTO, "body"),
  async (
    req: AuthRequest<unknown, unknown, UpdateUserDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await userService.updateOne(
        req.user.id,
        req.body
      );

      res.json(transformOutput(userOutputDTO, user));
    } catch (e) {
      next(e);
    }
  }
];
