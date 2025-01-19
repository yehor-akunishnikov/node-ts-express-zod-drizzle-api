import {StatusCodes} from "http-status-codes";

import {HttpError} from "@common/errors";

import * as characterRepo from "./character.repo";
import {
  CreateCharacterDTO,
  ManyCharactersSearchQueryDTO,
  OneCharacterSearchQueryDTO,
  UpdateCharacterDTO
} from "./schemas/validation.schema";

export const findMany = async (
  queryParams: ManyCharactersSearchQueryDTO
) => {
  return characterRepo.findMany(queryParams);
};

export const findOne = async (
  queryParams: OneCharacterSearchQueryDTO
) => {
  const character = await characterRepo.findOne(queryParams);

  if (!character) {
    throw new HttpError(StatusCodes.NOT_FOUND, "User not found");
  }

  return character;
};

export const create = async (
  authorId: number,
  payload: CreateCharacterDTO
) => {
  return characterRepo.create(authorId, payload);
};

export const update = async (
  id: number,
  payload: UpdateCharacterDTO
) => {
  return characterRepo.update(id, payload);
};

export const remove = async (
  id: number
) => {
  return characterRepo.remove(id);
};
