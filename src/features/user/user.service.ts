import {UpdateUserDTO, User, UserSearchQueryDTO} from "./user.schema";
import * as userRepo from "./user.repo";

export const findMany = async (
  query: UserSearchQueryDTO
): Promise<User[]> => {
  return userRepo.find(query);
};

export const findOne = async (
  query: Omit<UserSearchQueryDTO, "limit">
): Promise<User> => {
  return userRepo.find({...query, limit: 1}).then(users => users[0]);
};

export const addOne = async (
  payload: Pick<User, "email" | "password">
): Promise<void> => {
  return userRepo.addOne(payload);
};

export const updateOne = async (
  id: number,
  payload: UpdateUserDTO
): Promise<User> => {
  return userRepo.update(id, payload);
};
