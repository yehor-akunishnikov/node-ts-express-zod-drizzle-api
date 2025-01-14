import {StatusCodes} from "http-status-codes";

import {HttpError} from "@common/errors";

import {CharacterSearchQueryDTO, CreateCharacterDTO} from "./schema/validation.schema";
import * as characterRepo from "./character.repo";
import {Character} from "./schema/db.schema";

export const findMany = async (
  query: CharacterSearchQueryDTO
): Promise<Character[]> => {
  return characterRepo.find(query);
};

export const findOne = async (
  query: Omit<CharacterSearchQueryDTO, "limit">
): Promise<Character> => {
  const character = await characterRepo.find({...query, limit: 1}).then(
    characters => characters[0]
  );

  if (!character) {
    throw new HttpError(StatusCodes.NOT_FOUND, "Character not found");
  }

  return character;
};

export const create = async (
  payload: CreateCharacterDTO
): Promise<Character> => {
  return characterRepo.create(payload);
};
