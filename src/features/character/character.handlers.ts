import {Response, NextFunction} from "express";
import {StatusCodes} from "http-status-codes";
import passport from "passport";

import {transformOutput} from "@common/transformers";
import {applyRequestDTO} from "@common/middlewares";
import {AuthRequest} from "@common/types";

import {characterOutputDTO} from "./schemas/output.schema";
import * as characterService from "./character.service";
import {
  CreateCharacterDTO,
  createCharacterDTO,
  characterSearchQueryDTO,
  characterIdUrlParamDTO,
  CharacterIdUrlParamDTO,
  updateCharacterDTO,
  UpdateCharacterDTO
} from "./schemas/validation.schema";

export const getAll = [
  passport.authenticate("jwt", {session: false}),
  applyRequestDTO(characterSearchQueryDTO, "query"),
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const characters = await characterService.findMany(req.query);

      res.status(StatusCodes.OK).json(transformOutput(characterOutputDTO, characters));
    } catch (e) {
      next(e);
    }
  }
];

export const getById = [
  passport.authenticate("jwt", {session: false}),
  applyRequestDTO(characterIdUrlParamDTO, "params"),
  async (
    req: AuthRequest<CharacterIdUrlParamDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const character = await characterService.findOne({
        id: req.params.id
      });

      res.status(StatusCodes.OK).json(transformOutput(characterOutputDTO, character));
    } catch (e) {
      next(e);
    }
  }
];

export const create = [
  passport.authenticate("jwt", {session: false}),
  applyRequestDTO(createCharacterDTO, "body"),
  async (
    req: AuthRequest<unknown, unknown, CreateCharacterDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const character = await characterService.create(
        req.user.id,
        req.body
      );

      res.status(StatusCodes.CREATED).json(transformOutput(characterOutputDTO, character));
    } catch (e) {
      next(e);
    }
  }
];

export const update = [
  passport.authenticate("jwt", {session: false}),
  applyRequestDTO(characterIdUrlParamDTO, "params"),
  applyRequestDTO(updateCharacterDTO, "body"),
  async (
    req: AuthRequest<CharacterIdUrlParamDTO, unknown, UpdateCharacterDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const character = await characterService.update(
        req.params.id!,
        req.body
      );

      res.status(StatusCodes.OK).json(transformOutput(characterOutputDTO, character));
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
];

export const remove = [
  passport.authenticate("jwt", {session: false}),
  applyRequestDTO(characterIdUrlParamDTO, "params"),
  async (
    req: AuthRequest<CharacterIdUrlParamDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await characterService.remove(req.params.id!);

      res.status(StatusCodes.OK).json({message: "Successfully removed!"});
    } catch (e) {
      next(e);
    }
  }
];
