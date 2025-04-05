import {RawUser} from "./types";

export const getMeOutput = (
  user: RawUser
): Omit<RawUser, "password"> => {
  const {password, ...restUser} = user;

  return restUser;
};
