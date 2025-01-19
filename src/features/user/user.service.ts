import {StatusCodes} from "http-status-codes";

import {HttpError} from "@common/errors";
import {Prisma} from "@prisma/client";

import * as userRepo from "./user.repo";
import {
  ManyUsersSearchQueryDTO,
  OneUserSearchQueryDTO,
  UpdateUserDTO
} from "./schemas/validation.schema";

export const findMany = async (
  query: ManyUsersSearchQueryDTO
) => {
  return userRepo.findMany(query);
};

export const findOne = async (
  query: OneUserSearchQueryDTO
) => {
  const user = await userRepo.findOne(query);

  if (!user) {
    throw new HttpError(StatusCodes.NOT_FOUND, "User not found");
  }

  return user;
};

export const addOne = async (
  payload: Pick<Prisma.UserCreateInput, "email" | "password">
): Promise<void> => {
  return userRepo.addOne(payload);
};

export const updateOne = async (
  id: number,
  payload: UpdateUserDTO
) => {
  return userRepo.update(id, payload);
};
