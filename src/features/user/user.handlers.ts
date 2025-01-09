import {Request, Response, NextFunction} from "express";
import passport from "passport";

import {applyRequestDto} from "@common/middlewares";
import {transformOutput} from "@common/transformers";
import {AuthRequest} from "@common/types";

import * as userService from "./user.service";
import {
  UpdateUserDTO,
  updateUserDTO,
  UserIdUrlParamDto,
  userIdUrlParamDto,
  userOutputDTO,
  userSearchQueryDTO,
  UserSearchQueryDTO
} from "./user.schema";

export const getAll = [
  applyRequestDto(userSearchQueryDTO, "query"),
  async (
    req: Request<unknown, unknown, unknown, UserSearchQueryDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await userService.findMany(req.query);

      res.json(transformOutput<UserSearchQueryDTO[]>(userOutputDTO, users));
    } catch (e) {
      next(e);
    }
  }
];

export const getById = [
  applyRequestDto(userIdUrlParamDto, "params"),
  async (
    req: Request<UserIdUrlParamDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await userService.findOne({id: req.params.id});

      res.json(transformOutput<UserSearchQueryDTO[]>(userOutputDTO, user));
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

      res.json(transformOutput<UserSearchQueryDTO[]>(userOutputDTO, user));
    } catch (e) {
      next(e);
    }
  }
];

export const updateMe = [
  passport.authenticate("jwt", {session: false}),
  applyRequestDto(updateUserDTO, "body"),
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

      res.json(transformOutput<UserSearchQueryDTO[]>(userOutputDTO, user));
    } catch (e) {
      next(e);
    }
  }
];
