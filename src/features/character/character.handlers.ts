import {Request, Response, NextFunction} from "express";
import passport from "passport";

import {applyRequestDTO} from "@common/middlewares";
import {transformOutput} from "@common/transformers";
import {AuthRequest} from "@common/types";

import {characterOutputDTO, CharacterOutputDTO} from "./schema/output.schema";
import * as characterService from "./character.service";
import {
  characterSearchQueryDTO,
  CharacterSearchQueryDTO,
  characterIdUrlParamDTO,
  CharacterIdUrlParamDTO,
  createCharacterDTO,
  CreateCharacterDTO
} from "./schema/validation.schema";

export const getAll = [
  passport.authenticate("jwt", {session: false}),
  applyRequestDTO(characterSearchQueryDTO, "query"),
  async (
    req: Request<unknown, unknown, unknown, CharacterSearchQueryDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const characters = await characterService.findMany(req.query);

      res.json(transformOutput<CharacterOutputDTO[]>(characterOutputDTO, characters));
    } catch (e) {
      next(e);
    }
  }
];

export const getById = [
  passport.authenticate("jwt", {session: false}),
  applyRequestDTO(characterIdUrlParamDTO, "params"),
  async (
    req: Request<CharacterIdUrlParamDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const character = await characterService.findOne({id: req.params.id});

      res.json(transformOutput<CharacterOutputDTO>(characterOutputDTO, character));
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
      const character = await characterService.create({
        ...req.body,
        userId: req.user.id
      });

      res.status(201).json(transformOutput<CharacterOutputDTO>(characterOutputDTO, character));
    } catch (e) {
      next(e);
    }
  }
];
