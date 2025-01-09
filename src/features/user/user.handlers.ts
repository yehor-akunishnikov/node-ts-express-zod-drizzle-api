import {Request, Response} from "express";
import passport from "passport";

import {preprocessRequest} from "@common/middlewares";
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
  preprocessRequest(userSearchQueryDTO, "query"),
  async (
    req: Request<unknown, unknown, unknown, UserSearchQueryDTO>,
    res: Response
  ): Promise<void> => {
    const users = await userService.findMany(req.query);

    res.json(transformOutput<UserSearchQueryDTO[]>(userOutputDTO, users));
  }
];

export const getById = [
  preprocessRequest(userIdUrlParamDto, "params"),
  async (
    req: Request<UserIdUrlParamDto>,
    res: Response
  ): Promise<void> => {
    const user = await userService.findOne({id: req.params.id});

    res.json(transformOutput<UserSearchQueryDTO[]>(userOutputDTO, user));
  }
];

export const getMe = [
  passport.authenticate("jwt", {session: false}),
  async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    const user = await userService.findOne({id: req.user.id});

    res.json(transformOutput<UserSearchQueryDTO[]>(userOutputDTO, user));
  }
];

export const updateMe = [
  passport.authenticate("jwt", {session: false}),
  preprocessRequest(updateUserDTO, "body"),
  async (
    req: AuthRequest<unknown, unknown, UpdateUserDTO>,
    res: Response
  ): Promise<void> => {
    const user = await userService.updateOne(
      req.user.id,
      req.body
    );

    res.json(transformOutput<UserSearchQueryDTO[]>(userOutputDTO, user));
  }
];
