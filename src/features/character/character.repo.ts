import {prisma} from "@config/db";

import {
  CreateCharacterDTO,
  ManyCharactersSearchQueryDTO,
  OneCharacterSearchQueryDTO,
  UpdateCharacterDTO
} from "./schemas/validation.schema";

export const findMany = async (
  queryParams: ManyCharactersSearchQueryDTO
) => {
  const {limit, ...restQuery} = queryParams;

  return prisma.character.findMany({
    where: restQuery,
    take: limit
  });
};

export const findOne = async (
  queryParams: OneCharacterSearchQueryDTO
) => {
  return prisma.character.findFirst({
    where: queryParams
  });
};

export const create = async (
  authorId: number,
  {profile, ...restPayload}: CreateCharacterDTO
) => {
  return prisma.character.create({
    data: {
      authorId,
      ...restPayload,
      ...profile
    }
  });
};

export const update = async (
  id: number,
  {profile, ...restPayload}: UpdateCharacterDTO
) => {
  return prisma.character.update({
    where: {id},
    data: {
      ...restPayload,
      ...profile
    }
  });
};

export const remove = async (
  id: number
) => {
  return prisma.character.delete({
    where: {id}
  });
};
