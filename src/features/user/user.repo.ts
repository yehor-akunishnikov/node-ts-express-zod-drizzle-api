import {Prisma} from "@prisma/client";
import {prisma} from "@config/db";

import {
  ManyUsersSearchQueryDTO,
  UpdateUserDTO,
  OneUserSearchQueryDTO
} from "./schemas/validation.schema";

export const findMany = async (
  queryParams: ManyUsersSearchQueryDTO
) => {
  const {limit, ...restQuery} = queryParams;

  return prisma.user.findMany({
    where: restQuery,
    take: limit
  });
};

export const findOne = async (
  queryParams: OneUserSearchQueryDTO
) => {
  return prisma.user.findFirst({
    where: queryParams
  });
};

export const addOne = async (
  payload: Pick<Prisma.UserCreateInput, "email" | "password">
) => {
  await prisma.user.create({
    data: payload
  });
};

export const update = async (
  id: number,
  payload: UpdateUserDTO
) => {
  return prisma.user.update({
    where: {id},
    data: payload
  });
};
